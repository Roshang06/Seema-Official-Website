export const runtime = "nodejs";

import Stripe from "stripe";
import { headers } from "next/headers";
import { addOrder } from "../../../lib/storage";

export async function POST(req) {
  let event;

  try {
    const headersList = await headers();
    const sig = headersList.get("stripe-signature");
    const body = await req.text();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const items = JSON.parse(session.metadata.cart);

    // Calculate totals
    const subtotal = items.reduce((sum, i) => sum + i.basePrice * i.quantity, 0);
    const tax = subtotal * 0.102;
    const stripeFee = subtotal * 0.029 + 0.3;

    const order = {
      id: session.metadata.orderId,
      stripeSessionId: session.id,
      status: "PENDING",
      items: items,
      customerName: session.metadata.customerName,
      customerEmail: session.metadata.customerEmail,
      customerPhone: session.metadata.customerPhone,
      subtotal: subtotal,
      tax: tax,
      stripeFee: stripeFee,
      total: session.amount_total / 100,
      createdAt: new Date().toISOString(),
    };

    // Store order using file storage
    await addOrder(order);

    // Send confirmation email
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/emails/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "confirmation",
          order: order,
        }),
      });
    } catch (emailErr) {
      console.error("Failed to send confirmation email:", emailErr);
    }

    console.log("✅ Order stored:", order.id);
  }

  return new Response("OK", { status: 200 });
}

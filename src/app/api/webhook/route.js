import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

global.orders = global.orders || [];

export async function POST(req) {
  let event;

  try {
    const body = await req.text();
    const sig = headers().get("stripe-signature");

    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return new Response("Bad signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    global.orders.push({
      id: session.id,
      status: "PENDING",
      items: JSON.parse(session.metadata.cart),
      createdAt: new Date().toISOString(),
    });

    console.log("✅ Order stored:", session.id);
  }

  // ✅ Explicit 200 — no redirects, no JSON, no nonsense
  return new Response("OK", { status: 200 });
}

import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

global.orders = global.orders || [];

export async function POST(req) {
  const body = await req.text();
  const sig = headers().get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    global.orders.push({
      id: session.id,
      status: "PENDING",
      items: JSON.parse(session.metadata.cart),
      createdAt: new Date().toISOString(),
    });
  }

  return new Response("OK", { status: 200 });
}

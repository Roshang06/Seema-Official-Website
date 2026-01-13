export const runtime = "nodejs";

import Stripe from "stripe";
import { headers } from "next/headers";

global.orders = global.orders || [];

export async function POST(req) {
  let event;

  try {
    // ✅ FIX #1: Await headers() - it's async in Next.js 16
    const headersList = await headers();
    const sig = headersList.get("stripe-signature");

    // ✅ FIX #2: Get raw body and verify signature
    const body = await req.text();

    // ✅ Create Stripe instance inside handler to ensure env vars are loaded
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    console.error("Signature header:", headersList?.get("stripe-signature"));
    console.error("Webhook secret configured:", !!process.env.STRIPE_WEBHOOK_SECRET);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
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

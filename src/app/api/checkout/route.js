import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const cart = JSON.parse(await req.text());

  const subtotal = cart.reduce(
    (sum, i) => sum + i.basePrice * i.quantity,
    0
  );

  const tax = subtotal * 0.102;
  const stripeFee = subtotal * 0.029 + 0.3;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Seema Cafe Pickup Order" },
          unit_amount: Math.round((subtotal + tax + stripeFee) * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order`,
    metadata: {
      cart: JSON.stringify(cart),
    },
  });

  return NextResponse.json({ url: session.url });
}

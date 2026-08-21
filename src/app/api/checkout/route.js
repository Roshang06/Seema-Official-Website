import { NextResponse } from "next/server";

const MID = process.env.CLOVER_MERCHANT_ID;
const ACCESS_TOKEN = process.env.CLOVER_ECOMM_ACCESS_TOKEN;
const API_BASE = process.env.CLOVER_API_URL || "https://sandbox.dev.clover.com";

export async function POST(req) {
  try {
    const { cart, customerInfo, orderId: clientOrderId } = await req.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    };

    // 1. Create the Order Shell on Clover POS
    const orderResponse = await fetch(`${API_BASE}/v3/merchants/${MID}/orders`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        state: "OPEN",
        title: `Online Order #${clientOrderId}`,
        note: `Name: ${customerInfo.name} | Phone: ${customerInfo.phone}`,
      }),
    });

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text();
      throw new Error(`Clover Order Creation Failed: ${errorText}`);
    }
    const cloverOrder = await orderResponse.json();
    const cloverOrderId = cloverOrder.id;

    // 2. Add Line Items to the Clover Order
    // Clover expects values in cents
    for (const item of cart) {
      const itemPriceInCents = Math.round(item.basePrice * 100);
      
      let note = "";
      if (item.modifiers && Object.keys(item.modifiers).length > 0) {
        note = Object.entries(item.modifiers)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ");
      }

      // Add a line item for each unit quantity
      for (let q = 0; q < item.quantity; q++) {
        await fetch(`${API_BASE}/v3/merchants/${MID}/orders/${cloverOrderId}/line_items`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            name: item.itemname,
            price: itemPriceInCents,
            note: note || undefined,
          }),
        });
      }
    }

    // 3. Create Hosted Checkout Session linking the created order
    // Subtotal and tax calculations for the checkout metadata
    const subtotal = cart.reduce((sum, i) => sum + i.basePrice * i.quantity, 0);
    const tax = subtotal * 0.102;
    // Note: Clover charges its own merchant processing fees automatically; 
    // you don't typically line-item passing processing fees to the user unless explicit.
    const grandTotalInCents = Math.round((subtotal + tax) * 100);

    const checkoutResponse = await fetch(`${API_BASE}/v3/merchants/${MID}/checkout`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        orderId: cloverOrderId, // Binds payment directly to the POS order ticket
        amount: grandTotalInCents,
        currency: "usd",
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderId=${clientOrderId}&cloverOrder=${cloverOrderId}`,
      }),
    });

    if (!checkoutResponse.ok) {
      const errorText = await checkoutResponse.text();
      throw new Error(`Clover Checkout Session Failed: ${errorText}`);
    }

    const checkoutSession = await checkoutResponse.json();

    // Return the checkout URL provided by Clover
    return NextResponse.json({ url: checkoutSession.href });
  } catch (error) {
    console.error("Clover Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Error creating checkout session" },
      { status: 500 }
    );
  }
}
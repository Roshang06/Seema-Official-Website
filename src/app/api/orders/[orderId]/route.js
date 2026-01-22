import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { orderId } = params;

    const orders = global.orders || [];
    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ order });
  } catch (err) {
    console.error("Failed to fetch order:", err);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

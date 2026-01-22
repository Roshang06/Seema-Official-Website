import { NextResponse } from "next/server";
import { getOrderById } from "../../../../lib/storage";

export async function GET(req, { params }) {
  try {
    const { orderId } = params;

    const order = await getOrderById(orderId);

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

import { NextResponse } from "next/server";
import { readOrders, updateOrder } from "../../../../lib/storage";

export async function GET(req) {
  try {
    const orders = await readOrders();
    return NextResponse.json({ orders });
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Missing orderId or status" },
        { status: 400 }
      );
    }

    const order = await updateOrder(orderId, {
      status: status,
      updatedAt: new Date().toISOString(),
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Send email if order is marked as completed
    if (status === "COMPLETED") {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/emails/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "ready",
            order: order,
          }),
        });
      } catch (emailErr) {
        console.error("Failed to send ready email:", emailErr);
      }
    }

    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error("Failed to update order:", err);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

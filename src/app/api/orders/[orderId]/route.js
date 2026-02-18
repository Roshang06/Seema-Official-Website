import { NextResponse } from "next/server";
import { getOrderById } from "../../../../lib/supabase-storage";

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

    // Convert snake_case to camelCase for response
    const formattedOrder = {
      id: order.id,
      stripeSessionId: order.stripe_session_id,
      status: order.status,
      items: order.items,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      customerPhone: order.customer_phone,
      subtotal: order.subtotal,
      tax: order.tax,
      stripeFee: order.stripe_fee,
      total: order.total,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    };

    return NextResponse.json({ order: formattedOrder });
  } catch (err) {
    console.error("Failed to fetch order:", err);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

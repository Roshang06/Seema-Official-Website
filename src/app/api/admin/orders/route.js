import { NextResponse } from "next/server";
import { readOrders, updateOrder } from "../../../../lib/supabase-storage";

export async function GET(req) {
  try {
    const orders = await readOrders();
    
    // Convert snake_case from database to camelCase for frontend compatibility
    const formattedOrders = orders.map((order) => ({
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
    }));
    
    return NextResponse.json({ orders: formattedOrders });
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
    });

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

    // Send email if order is marked as completed
    if (status === "COMPLETED") {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/emails/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "ready",
            order: formattedOrder,
          }),
        });
      } catch (emailErr) {
        console.error("Failed to send ready email:", emailErr);
      }
    }

    return NextResponse.json({ success: true, order: formattedOrder });
  } catch (err) {
    console.error("Failed to update order:", err);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

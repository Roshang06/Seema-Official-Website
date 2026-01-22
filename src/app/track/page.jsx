"use client";
import { useState } from "react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    if (!orderId.trim()) {
      setError("Please enter an order ID");
      return;
    }

    setError("");
    setOrder(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Order not found");
        setLoading(false);
        return;
      }

      setOrder(data.order);
    } catch (err) {
      setError("Failed to fetch order");
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "PENDING":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-300";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Order</h1>
          <p className="text-gray-600">Enter your order ID to see the status of your pickup</p>
        </div>

        {/* Search Form */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order ID
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g., ORD-12345ABC"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                You received this ID in your confirmation email
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Searching..." : "Track Order"}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded mb-6">
            {error}
          </div>
        )}

        {/* Order Details */}
        {order && (
          <div className="bg-white rounded shadow overflow-hidden">
            {/* Status Card */}
            <div className={`p-6 border-b-4 ${getStatusColor(order.status)}`}>
              <p className="text-sm font-medium text-gray-600 mb-1">Order Status</p>
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">{order.status}</h2>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-mono text-lg font-bold">{order.id}</p>
                </div>
              </div>
            </div>

            {/* Timeline/Status Info */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-transparent border-b mb-6">
              {order.status === "PENDING" && (
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100">
                      <svg
                        className="h-6 w-6 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Your order is being prepared
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Our team is working on your order. Come pick it up at Seema Cafe!
                    </p>
                  </div>
                </div>
              )}

              {order.status === "COMPLETED" && (
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Your order is ready!
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Please come pick up your order at Seema Cafe.
                    </p>
                  </div>
                </div>
              )}

              {order.status === "CANCELLED" && (
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Order Cancelled
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      This order has been cancelled. Please contact us if you have questions.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Order Information */}
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Pickup Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-600">Name:</span>{" "}
                    <span className="font-medium">{order.customerName}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">Email:</span>{" "}
                    <span className="font-medium">{order.customerEmail}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">Phone:</span>{" "}
                    <span className="font-medium">{order.customerPhone}</span>
                  </p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Order Items
                </h3>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-start pb-2 border-b last:border-b-0"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        {Object.entries(item.modifiers).length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {Object.entries(item.modifiers)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(" • ")}
                          </p>
                        )}
                      </div>
                      <p className="text-gray-900 font-medium">
                        x{item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Order Time */}
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                <p>
                  <span className="font-medium">Ordered:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                {order.updatedAt && (
                  <p>
                    <span className="font-medium">Updated:</span>{" "}
                    {new Date(order.updatedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Links */}
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/order" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Order
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

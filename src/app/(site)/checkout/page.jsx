"use client";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

function generateOrderId() {
  return "ORD-" + Date.now().toString().slice(-8) + Math.random().toString(36).substring(2, 6).toUpperCase();
}

export default function CheckoutPage() {
  const { cart, subtotal } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [orderId] = useState(generateOrderId());

  const tax = subtotal * 0.102;
  // Dynamic application processing fees usually rely on the payment provider setup.
  // Clover accounts handle internal card merchant processing fees directly, so we drop the custom Stripe markup.
  const total = subtotal + tax;

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleCheckout(e) {
    e.preventDefault();

    if (!customerInfo.name.trim() || !customerInfo.email.trim() || !customerInfo.phone.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          customerInfo,
          orderId,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirects straight to checkout.clover.com
      } else {
        alert(data.error || "Error creating checkout session");
        setLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error creating checkout session");
      setLoading(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-600">Your cart is empty. <a href="/menu" className="text-blue-600">Continue shopping</a></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 gap-6">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cart.map((item, i) => (
                <div key={i} className="pb-3 border-b last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.itemname}</p>
                      {Object.keys(item.modifiers || {}).length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          {Object.entries(item.modifiers || {})
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(" • ")}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm text-gray-600">x{item.quantity}</p>
                      <p className="font-semibold text-gray-900">${(item.basePrice * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 bg-gray-50 p-4 rounded">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (10.2%):</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                <span>Total:</span>
                <span className="text-blue-600 text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Information Form */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Pickup Information</h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-mono text-lg font-bold text-blue-600">{orderId}</p>
                <p className="text-xs text-gray-500 mt-1">Save this for pickup</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {loading ? "Processing..." : "Pay with Clover"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
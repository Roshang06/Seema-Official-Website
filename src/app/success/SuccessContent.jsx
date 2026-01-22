"use client";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const id = searchParams.get("orderId");
    setOrderId(id);
    clearCart();
  }, []);

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <p className="text-gray-400">Loading order information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-gradient-to-br from-gray-800 to-slate-800 border border-green-500/30 p-8 rounded-xl shadow-2xl text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600">
              <svg
                className="h-10 w-10 text-white"
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

          {/* Success Message */}
          <h1
            style={{ fontFamily: "'Dancing Script', cursive" }}
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-rose-300 mb-3"
          >
            Order Placed! 🎉
          </h1>
          <p className="text-gray-300 mb-6">
            Thank you for your order at Seema Cafe. We're preparing your delicious treats!
          </p>

          {/* Order ID Card */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400 mb-1">Your Order ID</p>
            <p className="text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 break-all">
              {orderId}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Keep this ID for your records
            </p>
          </div>

          {/* Confirmation Email Notice */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-300">
              ✉️ <span className="font-semibold">A confirmation email with your receipt has been sent to the email address you provided.</span>
            </p>
          </div>

          {/* Next Steps */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-400/20">
                  <span className="text-pink-400 text-sm font-bold">1</span>
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-pink-300">
                  Get notified when ready
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  We'll email you when your order is ready for pickup
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-400/20">
                  <span className="text-green-400 text-sm font-bold">2</span>
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-green-300">
                  Come pick up your order
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Visit Seema Cafe to collect your delicious meal
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full px-4 py-3 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 text-center font-semibold transition border border-gray-600"
            >
              Back to Home
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-6 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
            <p>Questions or need help?</p>
            <p className="font-semibold text-gray-400 mt-1">📞 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
}

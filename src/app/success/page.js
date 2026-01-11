"use client";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">
        Order placed! 🎉 Pickup today at Seema Cafe.
      </h1>
    </div>
  );
}

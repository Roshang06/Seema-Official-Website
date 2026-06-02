"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    // Each cart item gets a unique cartItemId
    const cartItem = {
      ...item,
      cartItemId: Date.now() + Math.random(), // Unique identifier for this cart entry
      quantity: item.quantity || 1,
    };
    setCart((prev) => [...prev, cartItem]);
  }

  function removeFromCart(cartItemId) {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }

  function updateCartItem(cartItemId, updates) {
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, ...updates } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.basePrice * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCartItem, clearCart, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

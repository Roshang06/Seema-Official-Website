"use client";
import { useCart } from "@/app/(site)/context/CartContext";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage({ menu }) {
  const { cart, removeFromCart, updateCartItem, clearCart, subtotal } = useCart();
  const router = useRouter();
  const [editingItem, setEditingItem] = useState(null);
  const [editMods, setEditMods] = useState({});
  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setEditingItem(null);
        setEditMods({});
      }
    }

    if (editingItem) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [editingItem]);

  function handleEditClick(cartItem) {
    setEditingItem(cartItem);
    setEditMods(cartItem.modifiers || {});
  }

  function handleSaveModifiers() {
    if (editingItem) {
      updateCartItem(editingItem.cartItemId, { modifiers: editMods });
      setEditingItem(null);
      setEditMods({});
    }
  }

  function handleCheckout() {
    // Prepare for Clover integration - will be updated later
    router.push("/checkout");
  }

  // Get menu item details for editing
  const getMenuItemByName = (itemname) => {
    return menu.find((item) => item.itemname === itemname);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#030712,#111827,#1f2937)] text-gray-100">
        {/* Header */}
        <div className="bg-[linear-gradient(to_right,#111827,#1f2937)] px-6 py-12 border-b border-gray-700">
          <div className="max-w-7xl mx-auto">
            <h1
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-5xl font-bold bg-clip-text text-transparent bg-[linear-gradient(to_right,#fcd34d,#f472b6,#f97c9c)] mb-2"
            >
              Your Cart
            </h1>
            <p className="text-gray-400">Your cart is empty</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 text-center">
          <p className="text-gray-300 mb-6">Start adding items from the menu!</p>
          <button
            onClick={() => router.push("/menu")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#030712,#111827,#1f2937)] text-gray-100">
      {/* Header */}
      <div className="bg-[linear-gradient(to_right,#111827,#1f2937)] px-6 py-12 border-b border-gray-700">
        <div className="max-w-7xl mx-auto">
          <h1
            style={{ fontFamily: "'Dancing Script', cursive" }}
            className="text-5xl font-bold bg-clip-text text-transparent bg-[linear-gradient(to_right,#fcd34d,#f472b6,#f97c9c)] mb-2"
          >
            Your Cart
          </h1>
          <p className="text-gray-400">Review and edit your order</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* CART ITEMS */}
          <div className="md:col-span-2">
            <div className="bg-[linear-gradient(to_bottom_right,#1f2937,#1e293b)] border border-gray-700 rounded-lg p-6">
              <h2
                style={{ fontFamily: "'Dancing Script', cursive" }}
                className="text-2xl font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,#fcd34d,#f472b6)] mb-4"
              >
                Items in Cart
              </h2>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={item.cartItemId}
                    className="border border-gray-700 rounded-lg p-4 bg-gray-900"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-amber-300 text-lg">{item.itemname}</h3>
                        {Object.keys(item.modifiers || {}).length > 0 && (
                          <p className="text-xs text-gray-400 mt-1">
                            {Object.entries(item.modifiers || {})
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(" • ")}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-red-500 hover:text-red-400 font-bold transition"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex justify-between items-center gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-700 rounded-lg">
                        <button
                          onClick={() =>
                            updateCartItem(item.cartItemId, {
                              quantity: Math.max(1, (item.quantity || 1) - 1),
                            })
                          }
                          className="px-3 py-1 text-gray-400 hover:text-amber-300 transition"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 text-gray-200 font-semibold">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItem(item.cartItemId, {
                              quantity: (item.quantity || 1) + 1,
                            })
                          }
                          className="px-3 py-1 text-gray-400 hover:text-amber-300 transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm text-gray-400">
                          ${item.basePrice.toFixed(2)} each
                        </p>
                        <p className="text-lg font-bold text-pink-400">
                          ${(item.basePrice * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Edit Modifiers Button */}
                    {getMenuItemByName(item.itemname)?.modifiers &&
                      getMenuItemByName(item.itemname)?.modifiers?.length > 0 && (
                        <button
                          onClick={() => handleEditClick(item)}
                          className="mt-3 w-full px-3 py-2 border border-amber-400 text-amber-300 rounded-lg hover:bg-amber-400/10 transition text-sm font-semibold"
                        >
                          Edit Modifiers
                        </button>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-[linear-gradient(to_bottom_right,#1f2937,#1e293b)] border border-gray-700 p-6 rounded-lg h-fit sticky top-20 shadow-xl">
            <h2
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-2xl font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,#fcd34d,#f472b6)] mb-6"
            >
              Order Summary
            </h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-700">
              <div className="flex justify-between text-gray-400">
                <span>Items:</span>
                <span className="font-semibold">{cart.length}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Subtotal:</span>
                <span className="font-semibold text-amber-300">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 font-bold transition"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => {
                  clearCart();
                  router.push("/menu");
                }}
                className="w-full px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-amber-400 hover:text-amber-400 transition font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODIFIER EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="bg-[linear-gradient(to_bottom_right,#1f2937,#1e293b)] border border-gray-700 p-8 rounded-xl w-full max-w-md shadow-2xl"
          >
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,#fcd34d,#f472b6)] mb-2">
                Edit Modifiers
              </h3>
              <p className="text-gray-400">{editingItem.itemname}</p>
            </div>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {getMenuItemByName(editingItem.itemname)?.modifiers &&
              getMenuItemByName(editingItem.itemname)?.modifiers?.length > 0 ? (
                getMenuItemByName(editingItem.itemname)?.modifiers.map((modifier) => (
                  <div key={modifier.name} className="pb-4 border-b border-gray-700 last:border-b-0">
                    <p className="font-bold text-amber-300 capitalize mb-3">{modifier.name}</p>
                    <div className="space-y-2">
                      {modifier.options && modifier.options.length > 0 ? (
                        modifier.options.map((v) => (
                          <label
                            key={v}
                            className="flex items-center p-2 rounded hover:bg-gray-900 cursor-pointer transition"
                          >
                            <input
                              type="radio"
                              name={modifier.name}
                              value={v}
                              checked={editMods[modifier.name] === v}
                              onChange={() =>
                                setEditMods({ ...editMods, [modifier.name]: v })
                              }
                              className="mr-3 cursor-pointer"
                            />
                            <span className="text-gray-200">{v}</span>
                          </label>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm">No options available</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-300">No modifiers available for this item.</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditingItem(null);
                  setEditMods({});
                }}
                className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-amber-400 hover:text-amber-400 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModifiers}
                className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

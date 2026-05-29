"use client";
import { useCart } from "@/app/(site)/context/CartContext";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrderPage({menu}) {
  const { cart, addToCart, subtotal, removeFromCart } = useCart();
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [mods, setMods] = useState({});
  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelected(null);
        setMods({});
      }
    }

    if (selected) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [selected]);

  function handleAdd(item) {
    addToCart({
      itemId: item._id,
      itemname: item.itemname,
      basePrice: item.price,
      modifiers: mods,
      quantity: 1,
    });
    setSelected(null);
    setMods({});
  }

  function handleItemClick(item) {
    // If item has no modifiers, add directly to cart
    if (!item.modifiers || item.modifiers.length === 0) {
      addToCart({
        itemId: item._id,
        itemname: item.itemname,
        basePrice: item.price,
        modifiers: {},
        quantity: 1,
      });
    } else {
      // Otherwise show modal for modifier selection
      setSelected(item);
    }
  }

  function handleCheckout() {
    router.push("/checkout");
  }

  // Group menu items by section
  const groupedMenu = menu.reduce((acc, item) => {
    const section = item.section;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {});


  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#030712,#111827,#1f2937)] text-gray-100">
      {/* Header */}
      <div className="bg-[linear-gradient(to_right,#111827,#1f2937)] px-6 py-12 border-b border-gray-700">
        <div className="max-w-7xl mx-auto">
          <h1
            style={{ fontFamily: "'Dancing Script', cursive" }}
            className="text-5xl font-bold bg-clip-text text-transparent bg-[linear-gradient(to_right,#fcd34d,#f472b6,#f97c9c)] mb-2"
          >
            Place Your Order
          </h1>
          <p className="text-gray-400">Choose your favorites and customize your selections</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* MENU */}
          <div className="md:col-span-2 space-y-8">
            {Object.entries(groupedMenu).map(([section, items]) => (
              <div key={section}>
                <h2
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                  className="text-3xl font-bold bg-clip-text text-transparent bg-[linear-gradient(to_right,#fde047,#fcd34d,#fef08a)] mb-4 pb-3 border-b border-gray-700"
                >
                  {section}
                </h2>
                <div className="grid gap-3">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="bg-[linear-gradient(to_right,#1f2937,#1e293b)] border border-gray-700 p-4 rounded-lg hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/20 transition duration-300 flex justify-between items-center group cursor-pointer"
                      onClick={() => handleItemClick(item)}
                    >
                      <div>
                        <h3 className="font-semibold text-gray-100 group-hover:text-amber-300 transition">{item.itemname}</h3>
                        <p className="text-amber-300 font-bold text-lg">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(item);
                        }}
                        className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white/10 transition font-semibold"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CART */}
          <div className="bg-[linear-gradient(to_bottom_right,#1f2937,#1e293b)] border border-gray-700 p-6 rounded-lg h-fit sticky top-6 shadow-xl">
            <h2
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-2xl font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,#fcd34d,#f472b6)] mb-4"
            >
              Your Cart
            </h2>
            {cart.length === 0 ? (
              <p className="text-gray-400 text-sm mb-4">Your cart is empty</p>
            ) : (
              <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                {cart.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start p-3 bg-gray-900 rounded border border-gray-700 hover:border-amber-400 transition"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-amber-300">{item.itemname}</p>
                      {Object.keys(item.modifiers || {}).length > 0 && (
                        <p className="text-xs text-gray-400 mt-1">
                          {Object.entries(item.modifiers || {})
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(" • ")}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-pink-400 mt-1">
                        ${(item.basePrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(i)}
                      className="text-red-500 hover:text-red-400 font-bold ml-2 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="border-t border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal:</span>
                <span className="font-semibold text-amber-300">${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={!cart.length}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition mt-3"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="bg-[linear-gradient(to_bottom_right,#1f2937,#1e293b)] border border-gray-700 p-8 rounded-xl w-full max-w-md shadow-2xl"
          >
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,#fcd34d,#f472b6)] mb-2">
                {selected.itemname}
              </h3>
              <p className="text-amber-400 text-2xl font-bold">${selected.price.toFixed(2)}</p>
            </div>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {selected.modifiers && selected.modifiers.length > 0 ? (
                selected.modifiers.map((modifier) => (
                  <div key={modifier.name} className="pb-4 border-b border-gray-700 last:border-b-0">
                    <p className="font-bold text-amber-300 capitalize mb-3">{modifier.name}</p>
                    <div className="space-y-2">
                      {modifier.options.map((v) => (
                        <label
                          key={v}
                          className="flex items-center p-2 rounded hover:bg-gray-900 cursor-pointer transition"
                        >
                          <input
                            type="radio"
                            name={modifier.name}
                            value={v}
                            onChange={() => setMods({ ...mods, [modifier.name]: v })}
                            className="mr-3 cursor-pointer"
                          />
                          <span className="text-gray-200">{v}</span>
                        </label>
                      ))}
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
                  setSelected(null);
                  setMods({});
                }}
                className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-amber-400 hover:text-amber-400 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAdd(selected)}
                className="flex-1 px-4 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition font-bold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

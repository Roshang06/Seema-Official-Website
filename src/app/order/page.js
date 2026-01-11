"use client";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const MENU = [
  {
    id: "milk",
    name: "Milk",
    price: 5,
    modifiers: { sugar: ["No Sugar", "Less", "Regular"] },
  },
  {
    id: "vada-pav",
    name: "Vada Pav",
    price: 5,
    modifiers: { spice: ["Mild", "Medium", "Spicy"] },
  },
];

export default function OrderPage() {
  const { cart, addToCart, subtotal, removeFromCart } = useCart();
  const [selected, setSelected] = useState(null);
  const [mods, setMods] = useState({});

  function handleAdd(item) {
    addToCart({
      itemId: item.id,
      name: item.name,
      basePrice: item.price,
      modifiers: mods,
      quantity: 1,
    });
    setSelected(null);
    setMods({});
  }
  async function checkout() {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  });

  const { url } = await res.json();
  window.location.href = url;
}


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Order Pickup (Today Only)</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* MENU */}
        <div className="space-y-4">
          {MENU.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow flex justify-between"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => setSelected(item)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          ))}
        </div>

        {/* CART */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between mb-2">
              <div>
                {item.name}
                <div className="text-sm text-gray-500">
                  {Object.values(item.modifiers).join(", ")}
                </div>
              </div>
              <button
                onClick={() => removeFromCart(i)}
                className="text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <p className="mt-4 font-bold">Subtotal: ${subtotal.toFixed(2)}</p>

          <button
            onClick={checkout}
            disabled={!cart.length}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <h3 className="font-semibold mb-2">{selected.name}</h3>

            {Object.entries(selected.modifiers).map(([key, values]) => (
              <div key={key} className="mb-3">
                <p className="font-medium capitalize">{key}</p>
                {values.map((v) => (
                  <label key={v} className="block">
                    <input
                      type="radio"
                      name={key}
                      value={v}
                      onChange={() => setMods({ ...mods, [key]: v })}
                    />{" "}
                    {v}
                  </label>
                ))}
              </div>
            ))}

            <button
              onClick={() => handleAdd(selected)}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

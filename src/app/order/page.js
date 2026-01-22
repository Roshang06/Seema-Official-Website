"use client";
import { useCart } from "../context/CartContext";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const MENU = [
  // Hot Beverages
  {
    id: "filter-coffee",
    name: "Filter Coffee",
    price: 5,
    section: "Hot Beverages",
    modifiers: {
      sugar: ["No Sugar", "Less", "Regular", "Extra"],
      milk: ["Skinny", "Regular", "Extra Creamy"],
    },
  },
  {
    id: "tea",
    name: "Tea",
    price: 5,
    section: "Hot Beverages",
    modifiers: {
      sugar: ["No Sugar", "Less", "Regular", "Extra"],
      type: ["Black Tea", "Green Tea", "Herbal"],
    },
  },
  {
    id: "nescafe",
    name: "Nescafe",
    price: 5,
    section: "Hot Beverages",
    modifiers: {
      sugar: ["No Sugar", "Less", "Regular", "Extra"],
      milk: ["Skinny", "Regular", "Extra Creamy"],
    },
  },
  {
    id: "milk",
    name: "Milk",
    price: 5,
    section: "Hot Beverages",
    modifiers: {
      temperature: ["Hot", "Cold"],
      sugar: ["No Sugar", "Less", "Regular"],
    },
  },
  // Chat
  {
    id: "bun-maska",
    name: "Bun Maska",
    price: 5,
    section: "Chat",
    modifiers: {
      butterAmount: ["Light", "Regular", "Extra Butter"],
    },
  },
  {
    id: "dahi-sev-puri-chaat",
    name: "Dahi Sev Puri Chaat",
    price: 5,
    section: "Chat",
    modifiers: {
      spice: ["Mild", "Medium", "Spicy"],
      chutney: ["Tamarind", "Mint", "Both"],
    },
  },
  {
    id: "suralichi-vadi",
    name: "Suralichi Vadi",
    price: 5,
    section: "Chat",
    modifiers: {
      spice: ["Mild", "Medium", "Spicy"],
      chutney: ["With Chutney", "Without Chutney"],
    },
  },
  {
    id: "samosa",
    name: "Samosa",
    price: 5,
    section: "Chat",
    modifiers: {
      spice: ["Mild", "Medium", "Spicy"],
      quantity: ["1 Piece", "2 Pieces", "3 Pieces"],
    },
  },
  {
    id: "vada-pav",
    name: "Vada pav",
    price: 5,
    section: "Chat",
    modifiers: {
      spice: ["Mild", "Medium", "Spicy"],
      chutney: ["Tamarind", "Green", "Both"],
    },
  },
  {
    id: "cilantro-fritters",
    name: "Cilantro Fritters",
    price: 5,
    section: "Chat",
    modifiers: {
      spice: ["Mild", "Medium", "Spicy"],
      quantity: ["Small", "Medium", "Large"],
    },
  },
  {
    id: "paneer-thecha-puff",
    name: "Paneer Thecha Puff",
    price: 5,
    section: "Chat",
    modifiers: {
      spice: ["Mild", "Medium", "Spicy"],
    },
  },
  {
    id: "sabudana-vada",
    name: "Sabudana Vada",
    price: 5,
    section: "Chat",
    modifiers: {
      quantity: ["1 Piece", "2 Pieces", "3 Pieces"],
      chutney: ["With Chutney", "Without Chutney"],
    },
  },
  // Drinks
  {
    id: "mango-lassi",
    name: "Mango lassi",
    price: 5,
    section: "Drinks",
    modifiers: {
      sugar: ["No Sugar", "Less", "Regular", "Extra Sweet"],
      consistency: ["Thick", "Medium", "Thin"],
    },
  },
  {
    id: "mango-shake",
    name: "Mango shake",
    price: 5,
    section: "Drinks",
    modifiers: {
      size: ["Regular", "Large"],
      base: ["Yogurt", "Milk", "Almond Milk"],
    },
  },
  {
    id: "chikoo-shake",
    name: "Chikoo shake",
    price: 5,
    section: "Drinks",
    modifiers: {
      size: ["Regular", "Large"],
      base: ["Yogurt", "Milk", "Coconut Milk"],
    },
  },
  {
    id: "strawberry-shake",
    name: "Strawberry shake",
    price: 5,
    section: "Drinks",
    modifiers: {
      size: ["Regular", "Large"],
      base: ["Yogurt", "Milk", "Almond Milk"],
    },
  },
  // Smoothies
  {
    id: "strawberry-smoothie",
    name: "Strawberry Smoothie",
    price: 5,
    section: "Smoothies",
    modifiers: {
      size: ["Regular", "Large"],
      base: ["Yogurt", "Almond Milk", "Coconut Milk"],
    },
  },
  {
    id: "banana-smoothie",
    name: "Bannana Smoothie",
    price: 5,
    section: "Smoothies",
    modifiers: {
      size: ["Regular", "Large"],
      base: ["Yogurt", "Milk", "Coconut Milk"],
    },
  },
  {
    id: "blueberry-smoothie",
    name: "Blueberry Smoothie",
    price: 5,
    section: "Smoothies",
    modifiers: {
      size: ["Regular", "Large"],
      base: ["Yogurt", "Almond Milk", "Coconut Milk"],
    },
  },
  // Dessert
  {
    id: "malai-kulfi",
    name: "Malai kulfi",
    price: 5,
    section: "Dessert",
    modifiers: {
      quantity: ["1 Piece", "2 Pieces", "3 Pieces"],
    },
  },
  {
    id: "mango-kulfi",
    name: "Mango kulfi",
    price: 5,
    section: "Dessert",
    modifiers: {
      quantity: ["1 Piece", "2 Pieces", "3 Pieces"],
    },
  },
  {
    id: "chocolate-kulfi",
    name: "Chocolate kulfi",
    price: 5,
    section: "Dessert",
    modifiers: {
      quantity: ["1 Piece", "2 Pieces", "3 Pieces"],
    },
  },
  {
    id: "oreo-kulfi",
    name: "Oreo kulfi",
    price: 5,
    section: "Dessert",
    modifiers: {
      quantity: ["1 Piece", "2 Pieces", "3 Pieces"],
    },
  },
  // Acai Bowls
  {
    id: "banana-berry-crunch",
    name: "Bannana Berry Crunch",
    price: 5,
    section: "Acai Bowls",
    modifiers: {
      toppings: ["Standard", "Extra Granola", "Extra Berries"],
      size: ["Regular", "Large"],
    },
  },
  {
    id: "health-nut",
    name: "Health Nut",
    price: 5,
    section: "Acai Bowls",
    modifiers: {
      toppings: ["Standard", "Extra Seeds", "Extra Almonds"],
      size: ["Regular", "Large"],
    },
  },
  {
    id: "tropical-sunrise",
    name: "Tropical Sunrise",
    price: 5,
    section: "Acai Bowls",
    modifiers: {
      toppings: ["Standard", "Extra Fruit", "Extra Honey"],
      size: ["Regular", "Large"],
    },
  },
  {
    id: "vegan-berry-blast",
    name: "Vegan Berry Blast",
    price: 5,
    section: "Acai Bowls",
    modifiers: {
      toppings: ["Standard", "Extra Granola", "Extra Berries"],
      size: ["Regular", "Large"],
    },
  },
  // Add-ons
  {
    id: "whey-protein",
    name: "Whey protien",
    price: 5,
    section: "Add ons",
    modifiers: {
      flavor: ["Vanilla", "Chocolate", "Strawberry"],
    },
  },
  {
    id: "peanut-butter",
    name: "Peanut butter",
    price: 5,
    section: "Add ons",
    modifiers: {
      amount: ["1 Tbsp", "2 Tbsp", "3 Tbsp"],
    },
  },
];

export default function OrderPage() {
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
      itemId: item.id,
      name: item.name,
      basePrice: item.price,
      modifiers: mods,
      quantity: 1,
    });
    setSelected(null);
    setMods({});
  }

  function handleCheckout() {
    router.push("/checkout");
  }

  // Group menu items by section
  const groupedMenu = MENU.reduce((acc, item) => {
    const section = item.section;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {});


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-12 border-b border-gray-700">
        <div className="max-w-7xl mx-auto">
          <h1
            style={{ fontFamily: "'Dancing Script', cursive" }}
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-pink-300 to-rose-300 mb-2"
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
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-200 mb-4 pb-3 border-b border-gray-700"
                >
                  {section}
                </h2>
                <div className="grid gap-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gradient-to-r from-gray-800 to-slate-800 border border-gray-700 p-4 rounded-lg hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/20 transition duration-300 flex justify-between items-center group cursor-pointer"
                      onClick={() => setSelected(item)}
                    >
                      <div>
                        <h3 className="font-semibold text-gray-100 group-hover:text-amber-300 transition">{item.name}</h3>
                        <p className="text-amber-300 font-bold text-lg">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(item);
                        }}
                        className="bg-gradient-to-r from-amber-400 to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-amber-400/50 transition font-semibold"
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
          <div className="bg-gradient-to-br from-gray-800 to-slate-800 border border-gray-700 p-6 rounded-lg h-fit sticky top-6 shadow-xl">
            <h2
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-300 mb-4"
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
                      <p className="font-medium text-amber-300">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {Object.entries(item.modifiers)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(" • ")}
                      </p>
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
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition mt-3"
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
            className="bg-gradient-to-br from-gray-800 to-slate-800 border border-gray-700 p-8 rounded-xl w-full max-w-md shadow-2xl"
          >
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-300 mb-2">
                {selected.name}
              </h3>
              <p className="text-amber-400 text-2xl font-bold">${selected.price.toFixed(2)}</p>
            </div>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {Object.entries(selected.modifiers).map(([key, values]) => (
                <div key={key} className="pb-4 border-b border-gray-700 last:border-b-0">
                  <p className="font-bold text-amber-300 capitalize mb-3">{key}</p>
                  <div className="space-y-2">
                    {values.map((v) => (
                      <label
                        key={v}
                        className="flex items-center p-2 rounded hover:bg-gray-900 cursor-pointer transition"
                      >
                        <input
                          type="radio"
                          name={key}
                          value={v}
                          onChange={() => setMods({ ...mods, [key]: v })}
                          className="mr-3 cursor-pointer"
                        />
                        <span className="text-gray-200">{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
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
                className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-400 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-amber-400/50 transition font-bold"
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

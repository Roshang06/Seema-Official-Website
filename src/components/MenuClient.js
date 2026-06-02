"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/app/(site)/context/CartContext";
import MenuSidebar from "./MenuSidebar";

function MenuItem({ name, price, description, img, itemId, modifiers, onAddToCart }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMods, setSelectedMods] = useState({});
  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
        setSelectedMods({});
      }
    }

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showModal]);

  function handleAddClick(e) {
    e.stopPropagation();
    
    // If item has no modifiers, add directly
    if (!modifiers || modifiers.length === 0) {
      onAddToCart({
        itemId,
        itemname: name,
        basePrice: price,
        modifiers: {},
        quantity: 1,
      });
    } else {
      // Show modal for modifier selection
      setShowModal(true);
    }
  }

  function handleConfirmAdd() {
    onAddToCart({
      itemId,
      itemname: name,
      basePrice: price,
      modifiers: selectedMods,
      quantity: 1,
    });
    setShowModal(false);
    setSelectedMods({});
  }

  return (
    <>
      <div className="w-full bg-[linear-gradient(to_right,#1f2937,#1e293b)] border border-gray-700 px-4 py-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 relative">
        <div className="flex items-start gap-4">
          {/* Image */}
          {img && (
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-700 ring-1 ring-gray-600">
              <img src={img} alt={name} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="text-base font-semibold bg-[linear-gradient(to_right,#fcd34d,#fde047,#fde68a)] bg-clip-text text-transparent truncate">
                {name}
              </h4>
              {/* Only render price if it exists */}
              {price !== null && price !== undefined && (
                <span className="text-base font-semibold text-amber-100 flex-shrink-0">
                  ${typeof price === "number" ? price.toFixed(2) : price}
                </span>
              )}
            </div>
            {/* Only render description if it exists and is non-empty */}
            {description?.trim().length > 0 && (
              <p className="text-sm text-gray-400 mt-0.5 leading-snug line-clamp-2">
                {description}
              </p>
            )}
          </div>

          {/* Add to Cart Button - only show if price exists */}
          {price !== null && price !== undefined && (
            <button
              onClick={handleAddClick}
              className="absolute bottom-1 right-1 border-2 border-white rounded-lg text-white px-6 py-0.7 hover:bg-gray-100 transition hover:text-black font-semibold text-xs flex-shrink-0"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Modifier Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="bg-[linear-gradient(to_bottom_right,#1f2937,#1e293b)] border border-gray-700 p-8 rounded-xl w-full max-w-md shadow-2xl"
          >
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,#fcd34d,#f472b6)] mb-2">
                {name}
              </h3>
              <p className="text-amber-400 text-2xl font-bold">
                ${typeof price === "number" ? price.toFixed(2) : price}
              </p>
            </div>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {modifiers && modifiers.length > 0 ? (
                modifiers.map((modifier) => (
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
                              onChange={() => setSelectedMods({ ...selectedMods, [modifier.name]: v })}
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
                  setShowModal(false);
                  setSelectedMods({});
                }}
                className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-amber-400 hover:text-amber-400 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAdd}
                className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition font-bold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function MenuClient({ sections, items, title = "Our Menu" }) {
  const { addToCart } = useCart();
  const [activeSection, setActiveSection] = useState(sections[0]);
  const filtered = items.filter((item) => item.section === activeSection);

  function handleAddToCart(item) {
    addToCart(item);
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#030712,#111827,#1f2937)] text-gray-100">
      <MenuSidebar
        sections={sections}
        activeSection={activeSection}
        onSelect={setActiveSection}
      />

      <div className="md:ml-[52px] px-6 py-12 relative z-0">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-10">
            <h1
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-4xl md:text-6xl bg-clip-text text-transparent bg-[linear-gradient(to_right,#fcd34d,#fbcfe8,#ffe4e6)]"
            >
              {title}
            </h1>
            <p className="mt-3 text-gray-400 text-sm">
              A curated selection of favorites — handcrafted with fresh ingredients.
            </p>
          </header>

          <main>
            <h2
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-[linear-gradient(to_right,#fde68a,#fcd34d,#fef08a)] mb-4"
            >
              {activeSection}
            </h2>
            <div className="space-y-3">
              {filtered.map((item) => (
                <MenuItem
                  key={item.itemname}
                  name={item.itemname}
                  price={item.price}
                  description={item.description}
                  img={item.img}
                  itemId={item._id}
                  modifiers={item.modifiers}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
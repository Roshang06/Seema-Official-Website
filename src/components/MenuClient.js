"use client";

import { useState } from "react";
import MenuSidebar from "./MenuSidebar";

function MenuItem({ name, price, description, img }) {
  return (
    <div className="w-full bg-[linear-gradient(to_right,#1f2937,#1e293b)] border border-gray-700 px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start gap-4">
        {/* Only render image block if URL exists */}
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
      </div>
    </div>
  );
}

// Add title prop with "Our Menu" as default so the regular menu is unaffected
export default function MenuClient({ sections, items, title = "Our Menu" }) {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const filtered = items.filter((item) => item.section === activeSection);

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#030712,#111827,#1f2937)] text-gray-100">
      <MenuSidebar
        sections={sections}
        activeSection={activeSection}
        onSelect={setActiveSection}
      />

      <div className="md:ml-[52px] px-6 py-12">
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
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
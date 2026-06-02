"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/(site)/context/CartContext";

export default function Navbar({ cateringMenus = [] }) {
  const [open, setOpen] = useState(false);
  const [cateringOpen, setCateringOpen] = useState(false);
  const { cart } = useCart();

  return (
    <nav className="relative sticky top-0 z-50 bg-white shadow-sm px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <div className="flex items-center space-x-4">
          <img
            src="/favicon.ico"
            alt="Seema Tasty Delights logo"
            className="w-10 h-10 sm:w-12 h-12 object-contain"
            loading="lazy"
          />
          <Link href="/" className="flex flex-col leading-none">
            <span
              className="text-2xl font-bold text-gray-800"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Seema
            </span>
            <span className="text-[10px] sm:text-sm font-semibold text-gray-600 -mt-1">
              Tasty Delights
            </span>
          </Link>
        </div>

        {/* Center (desktop): absolute centered menu */}
        <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-gray-600">
          <li>
            <Link href="/menu" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 transition-colors">
              Menu
            </Link>
          </li>
          <li className="relative group">
            <button href="/cateringmenu" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 transition-colors">
              Catering
            </button>
            {/* Desktop Dropdown */}
            {cateringMenus.length > 0 && (
              <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded-md py-2 min-w-max z-50 ring-1 ring-gray-200">
                {cateringMenus.map((menu, index) => (
                  <Link
                    key={index}
                    href={`/cateringmenu/${menu.slug}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors whitespace-nowrap first:rounded-t-md last:rounded-b-md"
                  >
                    {menu.name}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li>
            <Link href="/findus" className="hover:text-blue-600 transition-colors">
              Find Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </li>
        </ul>
        
        {/* Right: Cart Icon + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link href="/cart" className="relative p-2 rounded-lg hover:bg-blue-50 transition-colors">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {/* Green dot indicator if cart has items */}
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            )}
          </Link>

          {/* Hamburger on mobile */}
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {/* Hamburger SVG (3 lines) */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 7h16"
                stroke="#1E40AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={open ? "opacity-0" : ""}
              />
              <path
                d="M4 12h16"
                stroke="#1E40AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 17h16"
                stroke="#1E40AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={open ? "opacity-0" : ""}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden mt-3">
          <div className="bg-white shadow-md rounded-md py-2 ring-1 ring-gray-200">
            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="flex justify-end block px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Menu
            </Link>
            {/* Mobile Catering with Accordion */}
            <div>
              <button
                onClick={() => setCateringOpen(!cateringOpen)}
                className="w-full flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                <span>Catering</span>
                <svg
                  className={`w-5 h-5 transition-transform ${cateringOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
              {/* Mobile Catering Submenu */}
              {cateringOpen && cateringMenus.length > 0 && (
                <div className="bg-gray-50">
                  {cateringMenus.map((menu, index) => (
                    <Link
                      key={index}
                      href={`/cateringmenu/${menu.slug}`}
                      onClick={() => {
                        setOpen(false);
                        setCateringOpen(false);
                      }}
                      className="block px-8 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors text-sm"
                    >
                      {menu.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/findus"
              onClick={() => setOpen(false)}
              className="flex justify-end block px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Find Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex justify-end block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-b-md"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

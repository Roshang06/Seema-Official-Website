"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative sticky top-0 z-50 bg-white shadow-sm px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <div className="flex items-center space-x-4">
          <img
            src="/favicon.ico"
            alt="Seema Tasty Delights logo"
            className="w-12 h-12 object-contain"
            loading="lazy"
          />
          <Link href="/" className="flex flex-col leading-none">
            <span
              className="text-2xl font-bold text-gray-800"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Seema
            </span>
            <span className="text-sm font-semibold text-gray-600 -mt-1">
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
        
        <div className="justify-center sm:justify-end">
          <a className="px-3 sm:px-6 py-2 rounded-lg text-white bg-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
              href="https://www.google.com" target="_blank"> {/* Placeholder link */}
            Order Online
          </a>
        </div>

        {/* Right: hamburger on mobile */}
        <div className="md:hidden">

          <button
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
            <Link
              href="/find-us"
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

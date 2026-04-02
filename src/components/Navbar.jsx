"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar({ cateringMenus = [] }) {
  const [open, setOpen] = useState(false);
  const [cateringOpen, setCateringOpen] = useState(false);

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
            <Link href="/cateringmenu" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 transition-colors">
              Catering
            </Link>
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
        
        <div className="justify-center sm:justify-end">
          <Link className="px-3 sm:px-6 py-2 whitespace-normal rounded-lg text-white bg-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
              href="/order" target="_blank"> {/* Placeholder link */}
            Order Online
          </Link>
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

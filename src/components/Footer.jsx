"use client";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-rose-900 to-pink-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Left: Logo + description + social */}
          <div className="md:w-2/5">
            <div className="flex items-center space-x-4">
              <img
                src="/favicon.ico"
                alt="Seema Tasty Delights logo"
                className="w-24 h-24 object-contain"
                loading="lazy"
              />
              <div className="leading-none">
                <span
                  className="text-3xl text-white block"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Seema
                </span>
                <span className="text-sm font-semibold text-pink-100 -mt-1 block">
                  Tasty Delights
                </span>
              </div>
            </div>

            <p className="mt-4 text-pink-100/90 max-w-md">
              Handcrafted sweets and savory treats made with love. Visit our
              shop for daily fresh desserts and specialty boxes.
            </p>

            <div className="mt-4 flex items-center space-x-4">
              <a
                href="https://www.instagram.com/seematastydelights/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <img src="/instagram.png" alt="Instagram" className="w-5 h-5" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <img src="/twitter.png" alt="Twitter" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Middle: Quick Links */}
          <div className="md:w-1/5">
            <h3 className="text-lg font-semibold text-pink-400">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-pink-50">
              <li>
                <Link
                  href="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/findus" className="hover:text-white transition-colors">
                  Find Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Visit Us */}
          <div className="md:w-1/4">
            <h3 className="text-lg font-semibold text-pink-400">Visit Us</h3>
            <ul className="mt-3 space-y-5 text-pink-50">
            <address className="not-italic mt-3 text-pink-50 space-y-2 text-sm">
              <li>3310 E Lake Sammamish Pkwy SE Suite F, Sammamish, WA 98075</li>
              <li>
                Phone: <a className="hover:text-white" href="tel:+425-615-4802">+1 (425) 615-4802</a>
              </li>
              <li>
                Email: <a className="hover:text-white" href="mailto:seemadelights@outlook.com">seemadelights@outlook.com</a>
              </li>
            </address>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 text-center text-sm text-white/70">
          © {year} Seema Tasty Delights. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

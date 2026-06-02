"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuSidebar({ sections, activeSection, onSelect }) {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Desktop: hover-expand left sidebar ── */}
      <motion.aside
        className="hidden md:flex flex-col fixed left-0 top-50 h-full z-50 bg-gray-900/95 backdrop-blur border-r border-gray-700/60 overflow-hidden"
        animate={{ width: expanded ? 196 : 52 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Logo / collapse indicator */}
        <div className="h-16 flex items-center justify-center border-b border-gray-700/60 flex-shrink-0">
          <span className="text-amber-400 text-lg">☰</span>
        </div>

        <nav className="flex flex-col gap-1 pt-4 px-2 overflow-y-auto">
          {sections.map((section) => {
            const isActive = activeSection === section;
            return (
              <button
                key={section}
                onClick={() => onSelect(section)}
                className={`flex items-center gap-3 px-2 py-2 rounded-lg text-left transition-colors duration-200 w-full ${
                  isActive
                    ? "bg-amber-400/15 text-amber-300"
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                }`}
              >
                {/* Initial badge */}
                <span
                  className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold flex-shrink-0 transition-colors duration-200 ${
                    isActive ? "bg-amber-400/20 text-amber-300" : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {section.charAt(0).toUpperCase()}
                </span>

                {/* Full label — fades in with the sidebar */}
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {section}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.span
                    layoutId="active-dot"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </motion.aside>

      {/* ── Mobile: scrollable top bar ── */}
      <div className="md:hidden sticky top-[96px] z-40 bg-gray-900/95 backdrop-blur border-b border-gray-700/60">
        <div className="flex overflow-x-auto gap-2 px-4 py-2 scrollbar-hide">
          {sections.map((section) => {
            const isActive = activeSection === section;
            return (
              <button
                key={section}
                onClick={() => onSelect(section)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border ${
                  isActive
                    ? "bg-amber-400/15 text-amber-300 border-amber-400/30"
                    : "text-gray-400 bg-gray-800/60 border-gray-700 hover:text-gray-200"
                }`}
              >
                {section}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
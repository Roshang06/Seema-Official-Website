"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-white">
      {/* Use an <img> so browsers can pick the right resolution (srcSet) and object-fit keeps aspect ratio */}
      <img
        src="/image.jpg"
        alt="failed" /* decorative image — leave alt empty for accessibility */
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <motion.div
        className="relative text-center max-w-2xl px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to <span className="text-pink-400">Seema Tasty Delights</span>
        </h1>
        <p className="text-lg mb-6">
          Your neighborhood destination for premium coffee, delectable sweets,
          and handcrafted jewelry on Sammamish Lake Road.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/menu"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg 
              transition-transform duration-300 ease-in-out 
              hover:-translate-y-1 hover:shadow-lg hover:bg-blue-700"
          >
            View Our Menu
          </Link>

          <Link className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black" href="/find-us" >
            Find Us
          </Link>

        
        </div>
      </motion.div>
    </section>
  );
}
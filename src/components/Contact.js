"use client";

import { useState } from "react";

export default function Contact({content}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Message sent 🚀");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      alert("Something went wrong 😬");
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#fdf2f8,#ffffff,#eff6ff)] pb-20 flex items-center">
      <div className="max-w-3xl mx-auto p-8 w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center text-gray-800">
          Contact Us
        </h1>

        <p className="text-center text-gray-600 mb-6">
          {content}
        </p>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              placeholder="Your Message"
              className="w-full p-3 border rounded-lg"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-full text-white font-semibold bg-[linear-gradient(to_right,#ec4899,#2563eb)] hover:-translate-y-1 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50 pb-20 flex items-center">
      <div className="max-w-3xl mx-auto p-8 w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center text-gray-800">Contact Us</h1>

        <p className="text-center text-gray-600 mb-6">
          We value your feedback and are open to suggestions — we're here to
          help. Please drop us a message and we'll get back to you as soon as
          possible.
        </p>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <form className="space-y-4">
            <input
              type="text"
              aria-label="Your Name"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
            />

            <input
              type="email"
              aria-label="Your Email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
            />

            <textarea
              placeholder="Your Message"
              aria-label="Your Message"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
              rows="6"
            ></textarea>

            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-block px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

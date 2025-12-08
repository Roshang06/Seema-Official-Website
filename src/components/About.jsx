import Link from "next/link";

export default function About() {
  return (
    <section className="py-20 px-8 md:px-16 text-center bg-white">
      <h2 className="text-3xl font-bold mb-6">
        More Than Just a Store, <span className="text-blue-600">It’s an Experience</span>
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-5">
        Located on beautiful Sammamish Lake Road, Seema Tasty Delights offers a
        warm, welcoming atmosphere where friends gather, conversations flow, and memories are made. View our <a href="/menu" className="text-blue-700" >menu</a> and order online today. 
      </p>

        <div className="justify-center sm:justify-end">
          <a className="px-3 sm:px-6 py-2 rounded-lg text-white bg-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
              href="https://www.google.com" target="_blank"> {/* Placeholder link */}
            Order Online
          </a>
        </div>
      
      <p className="mt-4 max-w-2xl mx-auto text-gray-600 mt-4">
        In addition to store, we offer catering to your events. <span className="text-blue-700" ><Link href="/contact" >Contact Us</Link></span> to learn more.
      </p>
    </section>
  );
}

import Link from "next/link";

export default function About() {
  return (
    <section className="py-20 px-8 md:px-16 text-center bg-white">
      <h2 className="text-3xl font-bold mb-6">
        More Than Just a Store, <span className="text-blue-600">It’s an Experience</span>
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600">
        Located on beautiful Sammamish Lake Road, Seema Tasty Delights offers a
        warm, welcoming atmosphere where friends gather, conversations flow, and memories are made. 
      </p>
      <p className="max-w-2xl mx-auto text-gray-600 mt-4">
        In addition to store, we offer catering to your events. <span className="text-blue-700" ><Link href="/contact" >Contact Us</Link></span> to learn more.
      </p>
    </section>
  );
}

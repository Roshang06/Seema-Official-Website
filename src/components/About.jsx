import Link from "next/link";

export default function About({ content }) {

  return (
    <section className="py-20 px-8 md:px-16 text-center bg-white">
      <h2 className="text-3xl font-bold mb-6">
        {content.about_title1}<span className="text-blue-600">{content.about_title2}</span>
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-5">
        {content.about_content} View our <a href="/menu" className="text-blue-700" >menu</a> and order online today. 
      </p>

        <div className="justify-center sm:justify-end">
          <Link className="px-3 sm:px-6 py-2 rounded-lg text-white bg-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
              href="/menu">
            Order Online
          </Link>
        </div>
      
      <p className="mt-4 max-w-2xl mx-auto text-gray-600 mt-4">
        In addition to our store, we offer catering to your events. <span className="text-blue-700" ><Link href="/contact" >Contact Us</Link></span> to learn more.
      </p>
      <p className="mt-4 max-w-2xl mx-auto text-gray-600 mt-4">
        Click <span className="text-blue-700" ><a href="https://seemas-cafe-sammamish.cloveronline.com/categories/all" >here</a></span> to view our presence on clover to see up to date in store availability.
      </p>

    </section>

  );
}

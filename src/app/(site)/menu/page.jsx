{/*import { client } from "@/sanity/lib/client";
import { urlFor } from '@/sanity/lib/image';

function MenuItem({ name, price,  description, img }) {
  return (
    <div className="w-full bg-[linear-gradient(to_right,#1f2937,#1e293b)] border border-gray-700 p-8 md:p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center">
     
        <div className="order-1 md:order-1 w-full md:w-2/3">
          <div className="flex items-baseline justify-between md:block">
            <h4 className="text-xl md:text-2xl font-semibold bg-[linear-gradient(to_right,#fcd34d,#fde047,#fde68a)] bg-clip-text text-transparent">{name}</h4>
            <div className="text-lg md:text-xl font-semibold text-amber-100 md:mt-2">${price}</div>
          </div>
        </div>

      
        <div className="order-2 md:order-3 w-full md:w-64 h-64 md:h-64 rounded-2xl overflow-hidden mt-4 md:mt-0 flex-shrink-0 md:ml-8 bg-gray-700 ring-1 ring-gray-700">
          <img src={img} alt={name} className="w-full h-full object-cover" />
        </div>

      
        <div className="order-3 md:order-2 mt-3 md:mt-0 w-full md:w-1/2 text-gray-200">
          <p className="text-sm md:text-base leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default async function Menu() {
const items = await client.fetch('*[_type == "menuitem" && catering != true]{section, itemname, price, description, mainImage}');
let sections = [];
items.forEach((item) => {
  if (!sections.includes(item.section)) {
    sections.push(item.section);
  }
});


  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#030712,#111827,#1f2937)] text-gray-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 style={{ fontFamily: "'Dancing Script', cursive" }} className="text-4xl md:text-6xl bg-clip-text text-transparent bg-[linear-gradient(to_right,#fcd34d,#fbcfe8,#ffe4e6)]">Our Menu</h1>
          <p className="mt-3 text-gray-300">A curated selection of favorites — handcrafted with fresh ingredients.</p>
        </header>

        <main className="space-y-10">
          {sections.map((section, i) => (
            <section key={i} className="">
              <h2 style={{ fontFamily: "'Dancing Script', cursive" }} className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-[linear-gradient(to_right,#fde68a,#fcd34d,#fef08a)] mb-4">{section}</h2>

              <div className="space-y-4">
                {items.filter(item => item.section === section).map((item) => (
                  <MenuItem key={item.itemname} name={item.itemname} price={item.price} description={item.description} img={urlFor(item.mainImage).url()} />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}*/}

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import MenuClient from "@/components/MenuClient"; // adjust path as needed

export default async function Menu() {
  const raw = await client.fetch(
    '*[_type == "menuitem" && catering != true]{_id, section, itemname, price, description, mainImage, modifiers[] {name, options}}'
  );

  // Resolve image URLs server-side so MenuClient stays purely presentational
  const items = raw.map((item) => ({
    ...item,
    img: urlFor(item.mainImage).url(),
  }));

  const sections = [...new Set(items.map((item) => item.section))];

  return <MenuClient sections={sections} items={items} />;
}

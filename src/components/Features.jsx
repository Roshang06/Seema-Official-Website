const features = [
  {
    title: "Indian Coffee",
    desc: "Start your day with our expertly crafted coffee blends.",
    link: "Explore Coffee Menu →",
    img: "/better_coffee.jpg"
  },
  {
    title: "Artisanal Sweets",
    desc: "Indulge in freshly baked pastries and desserts.",
    link: "View Sweet Treats →",
    img: "/better_sweets.jpg"
  },
  {
    title: "Handcrafted Jewelry",
    desc: "Discover unique jewelry pieces that tell a story.",
    link: "Explore Collection →",
    img: "/better_jewels.jpg"
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-500 to-white text-center">
      <h2 className="text-3xl font-bold mb-6">Three Delightful Experiences</h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-12">
        Discover our carefully curated selection of Indian coffee, artisanal sweets, and handcrafted jewelry.
      </p>

      <div className="grid md:grid-cols-3 gap-8 px-6 md:px-16">
        {features.map((f, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6 
             transition-transform duration-300 ease-in-out
             hover:-translate-y-2 hover:shadow-2xl">
            <img src={f.img} alt={f.title} className="w-full h-40 object-cover rounded-lg mb-4"/>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600 mb-4">{f.desc}</p>
            <a href="#" className="text-blue-600 font-medium hover:underline">{f.link}</a>
          </div>
        ))}
      </div>
    </section>
  );
}

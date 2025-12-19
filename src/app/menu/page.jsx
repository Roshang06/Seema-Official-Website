"use client";

const MENU = [
  {
    section: "Hot Beverages",
    items: [
      { name: "Filter Coffee", description: "A rich, full-bodied Indian blend — perfectly roasted and brewed to bring out smoky, chocolatey notes.", img: "/filter_coffee.jpeg", price: "$5"},
      {
        name: "Tea",
        description:
          "Traditional filter coffee prepared with care — velvety, fragrant, and comforting in every cup.",
  img: "/Tea.jpeg",
         price: "$5"
      },
      {
        name: "Nescafe",
        description:
          "A type of instant coffee made from roasted coffee beans.",
  img: "/nescafe.jpg",
         price: "$5"
      },
      { name: "Milk", description: "Plain milk served hot or cold, with or without sugar.", img: "/milk.jpg", price: "$5"},
    ],
  },
  {
    section: "Chat",
    items: [
  { name: "Bun Maska", description: "Soft bread slathered with Maska butter.", img: "/Bun_Maska1.jpeg" , price: "$5" },
  { name: "Dahi Sev Puri Chaat", description: "Small, crispy fried puris filled with spiced potatoes, chickpeas, onions, tangy chutneys (tamarind, mint), and cool yogurt.", img: "/Dahi_sev_puri_chaat.jpg" , price: "$5" },
  { name: "Suralichi Vadi", description: "Gram flour (besan) and yogurt (or buttermilk), seasoned with ingredients like turmeric, ginger, and green chili paste.", img: "/Suralichi_Vadi.jpg" , price: "$5" },
  { name: "Samosa", description: "Crispy pastry filled with spiced potatoes.", img: "/Samosa.jpeg" , price: "$5"},
  { name: "Vada pav", description: "Mumbai's spicy potato fritter tucked in a soft bun.", img: "/Vada_Pav.jpeg" , price: "$5" },
  { name: "Cilantro Fritters", description: "A savory fried food item consisting of fresh cilantro (coriander leaves) mixed into a batter, often with other ingredients like chickpea flour and spices.", img: "/Cilantro_Fritters.jpeg" , price: "$5" },
  { name: "Paneer Thecha Puff", description: "Paneer and tangy thecha in a buttery puff.", img: "/Paneer_thecha_puff.jpg" , price: "$5" },
  { name: "Sabudana Vada", description: "A traditional, deep-fried snack from the state of Maharashtra, India.", img: "/Sabudana_Vada.jpeg" , price: "$5" },
    ],
  },
  {
    section: "Drinks",
    items: [
  { name: "Mango lassi", description: "Creamy mango yogurt drink — sweet and tangy.", img: "/lassi.jpg" , price: "$5"},
  { name: "Mango shake", description: "Fresh mango blended with milk and love.", img: "/mango_shake.jpg" , price: "$5" },
  { name: "Chikoo shake", description: "Silky chikoo (sapota) shake with a touch of cardamom.", img: "/chikoo.jpg" , price: "$5" },
  { name: "Strawberry shake", description: "Bright, fruity, and refreshing.", img: "/strawberry.jpg"  , price: "$5"},
    ],
  },
  {
    section: "Smoothies",
    items: [
  { name: "Strawberry Smoothie", description: "Fresh strawberries, yogurt, and honey.", img: "/strawberry_smoothie.jpg" , price: "$5" },
  { name: "Bannana Smoothie", description: "Banana, oats, and a creamy base for energy.", img: "/banana.jpg" , price: "$5" },
  { name: "Blueberry Smoothie", description: "Antioxidant-rich blueberries with a smooth finish.", img: "/blueberry.jpg" , price: "$5" },
    ],
  },
  
  

  {
    section: "Dessert",
    items: [
  { name: "Malai kulfi", description: "Creamy traditional kulfi with cardamom.", img: "/malaikulfi.jpg" , price: "$5" },
  { name: "Mango kulfi", description: "Seasonal mango folded into chilled kulfi.", img: "/mangokulfi.jpg"  , price: "$5"},
  { name: "Chocolate kulfi", description: "Decadent chocolate kulfi for chocolate lovers.", img: "/chocolate.jpg" , price: "$5" },
  { name: "oreo kulfi", description: "Crunchy Oreo swirls in classic kulfi.", img: "/oreo.jpg" , price: "$5" },
    ],
  },

  {
    section: "Acai Bowls",
    items: [
  { name: "Bannana Berry Crunch", description: "Acai base topped with banana, granola and berries.", img: "/placeholder_food_image.jpg" , price: "$5" },
  { name: "Health Nut", description: "Nutty granola, seeds, and almond butter.", img: "/placeholder_food_image.jpg" , price: "$5" },
  { name: "Tropical Sunrise", description: "Pineapple, mango and a bright citrus finish.", img: "/placeholder_food_image.jpg" , price: "$5" },
  { name: "Vegan Berry Blast", description: "All plant-based, berry-forward and refreshing.", img: "/placeholder_food_image.jpg" , price: "$5" },
    ],
  },
  {
    section: "Add ons",
    items: [
  { name: "whey protien", description: "A scoop of whey protein to boost your smoothie.", img: "/placeholder_food_image.jpg" , price: "$5" },
  { name: "peanut butter", description: "Creamy peanut butter for extra flavor and protein.", img: "/placeholder_food_image.jpg" , price: "$5" },
    ],
  },
  
];

function MenuItem({ name, price,  description, img }) {
  return (
    <div className="w-full bg-gradient-to-r from-gray-800 to-slate-800 border border-gray-700 p-8 md:p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center">
        {/* Title: always first */}
        <div className="order-1 md:order-1 w-full md:w-2/3">
          <div className="flex items-baseline justify-between md:block">
            <h4 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-200 bg-clip-text text-transparent">{name}</h4>
            <div className="text-lg md:text-xl font-semibold text-amber-100 md:mt-2">{price}</div>
          </div>
        </div>

        {/* Image: appears second on small screens, right side on md+ */}
        <div className="order-2 md:order-3 w-full md:w-64 h-64 md:h-64 rounded-2xl overflow-hidden mt-4 md:mt-0 flex-shrink-0 md:ml-8 bg-gray-700 ring-1 ring-gray-700">
          <img src={img} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Description: appears last on small screens, second on md+ so it sits next to title */}
        <div className="order-3 md:order-2 mt-3 md:mt-0 w-full md:w-1/2 text-gray-200">
          <p className="text-sm md:text-base leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 style={{ fontFamily: "'Dancing Script', cursive" }} className="text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-pink-300 to-rose-300">Our Menu</h1>
          <p className="mt-3 text-gray-300">A curated selection of favorites — handcrafted with fresh ingredients.</p>
        </header>

        <main className="space-y-10">
          {MENU.map((section) => (
            <section key={section.section} className="">
              <h2 style={{ fontFamily: "'Dancing Script', cursive" }} className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-200 mb-4">{section.section}</h2>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <MenuItem key={item.name} name={item.name} price={item.price} description={item.description} img={item.img} />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

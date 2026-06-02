import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import MenuClient from "@/components/MenuClient"; // adjust path as needed

export async function generateStaticParams() {
  const menus = await client.fetch(
    `*[_type == "catering"]{ "slug": slug.current }`
  );
  return menus.map((menu) => ({ slug: menu.slug }));
}

export default async function CateringMenu({ params }) {
  const { slug } = await params;

  const menu = await client.fetch(
    `*[_type == "catering" && slug.current == $slug][0]{
      _id,
      name,
      items[]->{ 
        _id,
        itemname,
        section,
        price,
        description,
        mainImage,
        modifiers[]
      }
    }`,
    { slug }
  );

  if (!menu) {
    return (
      <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#030712,#111827,#1f2937)] text-gray-100 px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-amber-300">Menu Not Found</h1>
          <p className="mt-4 text-gray-300">
            Sorry, we couldn't find the catering menu you're looking for.
          </p>
        </div>
      </div>
    );
  }

  // Normalize items for MenuClient — resolve images server-side, null if missing
  const items = (menu.items ?? []).map((item) => ({
    section: item.section || "Other",
    itemname: item.itemname,
    price: item.price ?? null,
    description: item.description ?? "",
    _id: item._id,
    modifiers: item.modifiers ?? [],
    img: item.mainImage ? urlFor(item.mainImage).url() : null,
  }));

  const sections = [...new Set(items.map((item) => item.section))];

  return <MenuClient sections={sections} items={items} title={menu.name} />;
}
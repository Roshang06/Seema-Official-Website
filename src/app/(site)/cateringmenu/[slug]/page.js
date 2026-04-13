import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const menus = await client.fetch(
    `*[_type == "catering"]{ "slug": slug.current }`
  );

  return menus.map((menu) => ({
    slug: menu.slug,
  }));
}

export default async function CateringMenu({ params }) {
  const { slug } = await params;

  // Fetch the specific catering menu by slug
  const menu = await client.fetch(
    `*[_type == "catering" && slug.current == $slug][0]{
      _id,
      name,
      mainImage,
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
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100 px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-amber-300">Menu Not Found</h1>
          <p className="mt-4 text-gray-300">
            Sorry, we couldn't find the catering menu you're looking for.
          </p>
        </div>
      </div>
    );
  }

  // Group items by section
  const groupedItems =
    menu.items?.reduce((acc, item) => {
      const section = item.section || "Other";
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(item);
      return acc;
    }, {}) || {};

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <h1
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 mb-4"
            >
              {menu.name}
            </h1>
            <p className="mt-3 text-gray-300 text-lg my-6">
              Perfect for any occasion — delicious and beautifully presented.
            </p>
            {/*{menu.mainImage && (
              <img
                src={urlFor(menu.mainImage).url()}
                alt={menu.name}
                className="flex-h w-full object-cover rounded-lg mb-6 shadow-lg"
              />
            )}*/}
            
          </header>

          {/* Menu Items */}
          <div className="space-y-12">
            {Object.entries(groupedItems).map(([section, items]) => (
              <section key={section}>
                <h2 className="text-3xl font-bold text-amber-300 mb-6 pb-2 border-b border-amber-300/30">
                  {section}
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => {
                    const hasImage = item.mainImage;
                    const hasPrice =
                      item.price !== null && item.price !== undefined;
                    const hasDescription =
                      item.description &&
                      item.description.trim().length > 0;
                    const hasModifiers =
                      item.modifiers && item.modifiers.length > 0;

                    return (
                      <div
                        key={item._id}
                        className="bg-gray-800/50 backdrop-blur rounded-lg overflow-hidden hover:bg-gray-800/70 transition-colors border border-gray-700 hover:border-amber-300/50 flex flex-col h-full"
                      >
                        {/* Item Image */}
                        {hasImage && (
                          <img
                            src={urlFor(item.mainImage).url()}
                            alt={item.itemname}
                            className="w-full h-48 object-cover"
                          />
                        )}

                        {/* Item Details */}
                        <div className="p-4 flex flex-col flex-grow">
                          {/* Title and Price */}
                          <div className="mb-2">
                            <h3
                              className={`${
                                hasPrice ? "text-lg" : "text-xl"
                              } font-semibold text-amber-300 ${
                                hasPrice ? "mb-1" : ""
                              }`}
                            >
                              {item.itemname}
                            </h3>
                            {hasPrice && (
                              <span className="text-lg font-bold text-yellow-300 inline-block">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          {hasDescription && (
                            <p className="text-gray-400 text-sm mb-3 flex-grow">
                              {item.description}
                            </p>
                          )}

                          {/* Modifiers */}
                          {hasModifiers && (
                            <div className="mt-3 pt-3 border-t border-gray-700">
                              <p className="text-xs text-gray-500 mb-2">
                                Available Options:
                              </p>
                              <ul className="text-xs text-gray-400 space-y-1">
                                {item.modifiers.map((modifier, idx) => (
                                  <li key={idx}>• {modifier.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* No items message */}
          {Object.keys(groupedItems).length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No items available in this menu yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
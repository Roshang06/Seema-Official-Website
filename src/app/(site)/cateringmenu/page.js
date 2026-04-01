import { client } from "@/sanity/lib/client";
import { urlFor } from '@/sanity/lib/image';

export default async function CateringMenu() {
    const cateringMenus = await client.fetch('*[_type == "catering"]{itemname, mainImage}');

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100 px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-10">
                    <h1 style={{ fontFamily: "'Dancing Script', cursive" }} className="text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-300">Catering Menu</h1>
                    <p className="mt-3 text-gray-300">Perfect for any occasion — delicious and beautifully presented.</p>
                    </header>

                    {cateringMenus.map((menu, index)=> (
                        <div key={index}>
                            <img src={urlFor(menu.mainImage).url()} alt={menu.name} className="w-full h-auto"/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
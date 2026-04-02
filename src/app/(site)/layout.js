import "@/globals.css";
import { Dancing_Script } from "next/font/google";
import Navbar from "@/components/Navbar";
import { CartProvider } from "../(site)/context/CartContext";
import { AdminProvider } from "../(site)/context/AdminContext";
import { client } from "@/sanity/lib/client";

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Seema Tasty Delights",
  description: "Fresh coffee, smoothies, snacks, and more in Sammamish.",
};

export default async function RootLayout({ children }) {
  const cateringMenus = await client.fetch('*[_type == "catering"]{name, "slug": slug.current}');

  return (
    <html lang="en">
      <body
        className={`${dancingScript.variable} antialiased`}
      >
        <AdminProvider>
          <CartProvider>
            <Navbar cateringMenus={cateringMenus} />
            {children}
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  );
}

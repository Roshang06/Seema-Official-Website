import "@/globals.css";
import { Dancing_Script } from "next/font/google";
import Navbar from "@/components/Navbar";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dancingScript.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

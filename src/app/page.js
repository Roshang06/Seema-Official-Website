import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";


export default async function Home(){
    const homeData = await client.fetch('*[_type == "homepage"][0]');

    return(
        <>    
            <Hero content={homeData} />
            <Features />
            <About />
            <Footer />
        </>
    );
}
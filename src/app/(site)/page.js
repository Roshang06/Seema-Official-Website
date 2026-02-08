import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";


export default async function Home(){
    const HomeData = await client.fetch('*[_type == "homepage"][0]');
    const features = await client.fetch('*[_type == "feature"]{title, content, image, linkedtext}');
    const siteSettings = await client.fetch('*[_type == "sitesettings"][0]{address, email, instagram, phone}');

    return(
        <>    
            <Hero content={HomeData} />
            <Features content={HomeData} features_content={features}/>
            <About content={HomeData} />
            <Footer content={HomeData} info={siteSettings} />
        </>
    );
}
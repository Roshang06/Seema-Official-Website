import { client } from "@/sanity/lib/client";
import Contact from "@/components/Contact";

export default async function ContactParent() {
  const content = await client.fetch('*[_type == "contact"][0]{contacttext}');
  
  return (
    <Contact content={content.contacttext} />
  );
}

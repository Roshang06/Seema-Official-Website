import { client } from "@/sanity/lib/client";
import OrderPage from "@/components/Orderpage";

export default async function Order() {
  const menu = await client.fetch('*[_type == "menuitem" && catering != true]{_id, itemname, price, section, modifiers[] {name,options}}');
  return (
    <OrderPage menu={menu} />
  );
}
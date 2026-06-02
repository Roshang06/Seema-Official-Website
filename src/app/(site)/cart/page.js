import { client } from "@/sanity/lib/client";
import CartPage from "@/components/CartPage";

export default async function Cart() {
  const menu = await client.fetch('*[_type == "menuitem" && catering != true]{_id, itemname, price, section, modifiers[] {name,options}}');
  return (
    <CartPage menu={menu} />
  );
}

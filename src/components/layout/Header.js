"use client";
import {  useCart } from "@/context/CartContext";
import Link from "next/link";


function Header() {
const [state]=useCart()
 
  return (
    <div>
      header
      <div>
        <Link href={"/cart"}>cart</Link>
        <p>{state.itemsCounter}</p>
      </div>
    </div>
  );
}

export default Header;

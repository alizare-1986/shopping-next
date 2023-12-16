import CartProvider from "@/context/CartContext";
import Link from "next/link";




export default function Home() {
  return (
  
     <div>
      
   <h1>shopping for you</h1>
   <br></br>
   <Link href={"/products"}>continue to shop</Link>
      
     </div>
    
  );
}

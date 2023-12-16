"use client";
import Loader from "@/components/template/Loader";
import { useProducts } from "@/context/ProductsContext";
import Link from "next/link";

function ProductDetails({ params }) {
  const id = params;
  const{productId}=id
  const products = useProducts();
  const product = products.find((item) => item.id === +productId );
  
  if(!product)return <Loader/>

  return <div>
    <img src={product.image} alt={product.title}/>
    <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>{product.category}</p>
        <div>
            <span>{product.price} $</span>
            <Link href={"/products"}>back to shop</Link>
        </div>
    </div>
  </div>;
}

export default ProductDetails;

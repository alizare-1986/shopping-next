"use client";


import ProductsPage from "@/components/template/ProductsPage";
import { useProducts } from "@/context/ProductsContext";

function ProductsClient() {
  const products = useProducts();

  return (
    <div>
   
      <ProductsPage products={products} />
    
    </div>
  );
}

export default ProductsClient;

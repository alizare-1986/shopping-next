import CartProvider from "@/context/CartContext";
import ProductsProvider from "@/context/ProductsContext";

export default function RootLayout({ children }) {
  return <ProductsProvider>{children}</ProductsProvider>;
}

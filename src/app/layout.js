
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import ProductsProvider from "@/context/ProductsContext";
import CartProvider from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "shoping",
  description: "shoping products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        
          <ProductsProvider><CartProvider><Layout>{children}</Layout></CartProvider></ProductsProvider>
        
      </body>
    </html>
  );
}

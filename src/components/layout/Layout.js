import CartProvider from "@/context/CartContext";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  const style = { minHeight: "1000px" };
  return (
    <div>
      <Header />
      <div style={style}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;

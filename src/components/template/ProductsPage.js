"use client";
import { useEffect, useState } from "react";
import Card from "../module/Card";
import Loader from "./Loader";
import { FaListUl } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { filterProducts, searchProducts } from "@/helper/helper";
import { useRouter } from "next/navigation";

function ProductsPage({ products }) {
  const [search, setSearch] = useState("");
  const [displayed, setDisplayed] = useState([]);
  const [query, setQuery] = useState({});
  const router = useRouter();

  const searchHandler = () => {
    let href = window.location.href;

    const searchp = window.location.search;

    let pathname = href.replace(searchp, "");
    const category = query.category;
    if (!category) {
      router.replace(`${pathname}/?searchproducts=${search}`);
    } else if (search || category) {
      router.replace(`${pathname}/?category=${category}/?search=${search}`);
    }
    setQuery((query) => ({ ...query, search }));
  };
  const categoryHandler = (event) => {
    const { tagName } = event.target;
    const category = event.target.innerText.toLowerCase();
    if (tagName !== "LI") return;
    if (category === "all") {
      return setDisplayed(products), router.replace("/products");
    }
    let href = window.location.href;
    let cate = window.location.search;

    let pathname = href.replace(cate, "");

    if (category !== "all") {
      router.replace(`${pathname}/?category=${category}`);
    }

    setQuery((query) => ({ ...query, category }));
  };

  useEffect(() => {
    setDisplayed(products);
  }, [products]);
  useEffect(() => {
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  return (
    <>
      <div>
        <input
          className=" text-black"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
        />
        <button onClick={searchHandler}>
          <ImSearch />
        </button>
      </div>
      <div className="flex ">
        <div className="  flex flex-wrap justify-between mx-14">
          {displayed.length === 0 ? (
            <Loader />
          ) : (
            displayed.map((product) => <Card key={product.id} data={product} />)
          )}
        </div>
        <div className=" flex flex-col w-[1000px]">
          <div className=" flex ">
            <FaListUl />
            <p>Categories</p>
          </div>
          <ul onClick={categoryHandler}>
            <li>All</li>
            <li>Electronics</li>
            <li>Jewelery</li>
            <li>Men's Clothing</li>
            <li>Women's Clothing</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;

"use client";
import { useCart } from "@/context/CartContext";
import { productQuantity, shorten } from "@/helper/helper";
import Link from "next/link";
import { TbListDetails } from "react-icons/tb";
import { TbShoppingBagCheck } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";

function Card({ data }) {
  const { id, title, image, price } = data;
  const [state, dispatch] = useCart();

  const quantity = productQuantity(state, id);
 

  const clickHandler = (type) => {
    dispatch({ type, payload: data });
  };

  return (
    <div className=" flex justify-center items-center bg-white flex-col w-72 m-3 p-5 border-dashed rounded-xl text-black ">
      <Image height={300} width={300} src={image} alt="product" priority={true} className=" p-5 mb-5"/>
      {/* <img
        className=" w-56 h-56 p-5 mb-5 bg-white"
        src={image}
        alt={shorten(title)}
      /> */}
      <h3 className=" text-orange-600 text-lg  ">{shorten(title)}</h3>
      <p className=" text-gray-500 text-base font-semibold mx-5 mt-2">
        $ {price}
      </p>

      <div className=" w-full flex justify-between items-center mt-3 ">
        <Link
          className=" text-3xl h-6  text-green-700 cursor-pointer mx-2 "
          href={`/products/${data.id}`}
        >
          <TbListDetails />
        </Link>{" "}
        <div className="flex items-center justify-center">
          {quantity === 1 && (
            <button
              onClick={() => clickHandler("REMOVE_ITEM")}
              className=" text-blue-500 text-3xl h-8 w-8 leading-8 p-1 cursor-pointer"
            >
              <MdDeleteOutline />
            </button>
          )}

          {quantity > 1 && (
            <button
              onClick={() => clickHandler("DECREASE")}
              className=" text-blue-500 text-3xl h-8 w-8 leading-8 p-1 cursor-pointer"
            >
              -
            </button>
          )}
          {!!quantity&&<span>{quantity}</span>}
          {/* or
          {quantity>=1 &&<span>{quantity}</span>} */}
          
          {quantity === 0 ? (
            <button
              onClick={() => clickHandler("ADD_ITEM")}
              className=" text-blue-500 text-3xl h-8 w-8 leading-8 p-1 cursor-pointer"
            >
              <TbShoppingBagCheck />
            </button>
          ) : (
            <button
              onClick={() => clickHandler("INCREASE")}
              className=" text-blue-500 text-3xl h-8 w-8 leading-8 p-1 cursor-pointer"
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;

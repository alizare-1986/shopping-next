"use client";
import { useCart } from "@/context/CartContext";
import { productQuantity } from "@/helper/helper";
import Image from "next/image";

function CardCart({ data }) {
  const [state, dispatch] = useCart();
  const { id } = data;
  const quantity = productQuantity(state, id);

  return (
    <div className="flex ">
      <div className=" flex flex-row border w-[1000px] mx-56 mt-10 p-10 rounded-xl">
        <Image
          src={data.image}
          width={200}
          height={200}
          alt={data.title}
          className="  mx-5 border rounded-xl"
        />
        <div className=" flex flex-col">
          <h2>{data.title}</h2>
          <p>Categort : {data.category}</p>
          <p>Description : {data.description}</p>
          <p>$ : {data.price}</p>
        </div>
        <div className=" flex items-end  ">
          <div className=" mr-2">
            {quantity === 1 ? (
              <button
                onClick={() => dispatch({ type: "REMOVE_ITEM", payload: data })}
              >
                delete
              </button>
            ) : (
              <button
                onClick={() => dispatch({ type: "DECREASE", payload: data })}
              >
                -
              </button>
            )}
          </div>
          <span>{quantity}</span>

          <button onClick={() => dispatch({ type: "INCREASE", payload: data })} className=" ml-2">
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardCart;

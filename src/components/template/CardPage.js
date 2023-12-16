"use client";
import { useCart } from "@/context/CartContext";
import CardCart from "../module/CardCart";
import Link from "next/link";

function CardPage() {
  const [state, dispatch] = useCart();

 
  return (
    <div>
      {state.selectedItems.map((item) => (
        <CardCart key={item.id} data={item} />
      ))}
      <div>
        <div>
          {state.itemsCounter > 0 && (
            <div>
              <p>
                <span>total items :</span>
                {state.itemsCounter}
              </p>
              <p>
                <span>total :</span> {state.total} $
              </p>
              <div>
                <button onClick={() => dispatch({ type: "CHECKOUT" })}>
                  checkout
                </button>
                <button onClick={() => dispatch({ type: "CLEAR" })}>
                  clear
                </button>
              </div>
            </div>
          )}
          {state.checkout && (
            <div>
              <p> checkout succsessfully</p>
              <Link href={"/products"}>go shop</Link>
            </div>
          )}
          {!state.checkout && state.itemsCounter === 0 && (
            <div>
              <p>want to bye</p>
              <Link href={"/products"}>back to shop</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardPage;

"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import { sumProducts } from "@/helper/helper";

export const CartContext = createContext();
const initialState = {
  selectedItems: [],
  total: 0,
  itemsCounter: 0,
  checkout: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
      localStorage.setItem(
        "shopStore-productslist",
        JSON.stringify({
          ...state,
          selectedItems: [...state.selectedItems],
          ...sumProducts(state.selectedItems),
        })
      );

      return {
        ...state,
        selectedItems: [...state.selectedItems],
        checkout: false,
        ...sumProducts(state.selectedItems),
      };
    // remove products (When user selects more than one product and wants to remove a number of them)
    case "REMOVE_ITEM":
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem(
        "shopStore-productslist",
        JSON.stringify({
          ...state,
          selectedItems: [...newSelectedItems],
          ...sumProducts(newSelectedItems),
          checkout: false,
        })
      );
      return {
        ...state,
        selectedItems: [...newSelectedItems],
        ...sumProducts(newSelectedItems),
        checkout: false,
      };
    // add products (when user want to add more than one product)
    case "INCREASE":
      const indexI = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[indexI].quantity++;
      localStorage.setItem(
        "shopStore-productslist",
        JSON.stringify({
          ...state,
          ...sumProducts(state.selectedItems),
        })
      );
      return {
        ...state,
        ...sumProducts(state.selectedItems),
      };

    // remove products (When user selects more than one product and wants to remove a number of them)
    case "DECREASE":
      const indexD = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[indexD].quantity--;

      localStorage.setItem(
        "shopStore-productslist",
        JSON.stringify({
          ...state,
          ...sumProducts(state.selectedItems),
        })
      );
      return {
        ...state,
        ...sumProducts(state.selectedItems),
      };
    case "CHECKOUT":
      localStorage.setItem(
        "shopStore-productslist",
        JSON.stringify({
          selectedItems: [],
          itemsCounter: 0,
          total: 0,
          checkout: true,
        })
      );
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
      };
    case "CLEAR":
      localStorage.setItem(
        "shopStore-productslist",
        JSON.stringify({
          selectedItems: [],
          itemsCounter: 0,
          total: 0,
          checkout: false,
        })
      );
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: false,
      };

    default:
      throw new Error("invalid action");
  }
};
function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const saveToLocale = () => {
    const savedItems = localStorage.getItem("shopStore-productslist");
    const parsedItems = JSON.parse(savedItems);
    if (savedItems != null) {
      initialState.selectedItems = parsedItems.selectedItems;
      initialState.itemsCounter = parsedItems.itemsCounter;
      initialState.total = parsedItems.total;
      initialState.checkout = parsedItems.checkout;
    }
  };

  useEffect(() => {
    saveToLocale();
  }, []);
  const savedItems = localStorage.getItem("shopStore-productslist");
  const parsedItems = JSON.parse(savedItems);
  if (savedItems != null) {
    initialState.selectedItems = parsedItems.selectedItems;
    initialState.itemsCounter = parsedItems.itemsCounter;
    initialState.total = parsedItems.total;
    initialState.checkout = parsedItems.checkout;
  }

 
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  return [state, dispatch];
};

export default CartProvider;
export { useCart };

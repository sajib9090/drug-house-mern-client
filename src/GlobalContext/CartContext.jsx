import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducers/CartReducer";

const CartContext = createContext();

//getting carts data from local storage
const getLocalStorageCartData = () => {
  let localStorageCartData = localStorage.getItem("shikder-cart");
  // if our first carts value empty then set empy array
  if (localStorageCartData === null) {
    return [];
  } else {
    return JSON.parse(localStorageCartData);
  }
};

const initialState = {
  // carts: [],
  // making a new function and set carts value
  carts: getLocalStorageCartData(),
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //add item data inside cart
  const handleAddToCart = (selectedProduct, quantity) => {
    dispatch({ type: "ADD_TO_CART", payload: { selectedProduct, quantity } });
  };

  // cart item quantity increase and decrease
  const handlePlus = (item) => {
    dispatch({ type: "SET_CART_ITEM_QUANTITY_INCREMENT", payload: item });
  };
  const handleMinus = (item) => {
    dispatch({ type: "SET_CART_ITEM_QUANTITY_DECREMENT", payload: item });
  };

  //remove all cart data
  const handleRemoveAll = () => {
    dispatch({ type: "REMOVE_CART_DATA" });
  };

  //add cart data inside local storage
  useEffect(() => {
    localStorage.setItem("shikder-cart", JSON.stringify(state.carts));
    // set every data when add new one. make it with dependency
  }, [state.carts]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        handleAddToCart,
        handleRemoveAll,
        handlePlus,
        handleMinus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, CartContext, useCartContext };

const CartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { selectedProduct, quantity } = action.payload;

    const existingItemIndex = state.carts.findIndex(
      (item) => item.product_id === selectedProduct._id
    );

    if (existingItemIndex !== -1) {
      const updatedCarts = [...state.carts];
      updatedCarts[existingItemIndex].product_quantity += parseInt(quantity);

      return {
        ...state,
        carts: updatedCarts,
      };
    } else {
      let cartProduct = {
        _id: selectedProduct._id,
        product_id: selectedProduct._id,
        product_name: selectedProduct.medicine_name,
        product_image: selectedProduct.medicine_image,
        product_group: selectedProduct.medicine_generic,
        product_size: selectedProduct.medicine_strength,
        product_formation: selectedProduct.medicine_dosage_form,
        product_price_per_unit: parseFloat(
          selectedProduct.medicine_price_per_unit
        ),
        product_quantity: parseInt(quantity),
        product_available_quantity: parseInt(
          selectedProduct.medicine_available_quantity
        ),
        seller_email: selectedProduct.seller_email,
      };

      return {
        ...state,
        carts: [...state.carts, cartProduct],
      };
    }
  }

  //handle item quantity increment and decrement
  if (action.type === "SET_CART_ITEM_QUANTITY_INCREMENT") {
    let updatedProductQuantity = state?.carts?.map((currentItem) => {
      if (currentItem?._id === action?.payload?._id) {
        // if matched then increment 1 after every click
        let incrementAmount = currentItem?.product_quantity + 1;

        // we don't want anyone to increase more than the quantity available
        if (incrementAmount >= action?.payload?.product_available_quantity) {
          incrementAmount = action?.payload?.product_available_quantity;
        }
        return {
          ...currentItem,
          product_quantity: incrementAmount,
        };
      } else {
        return currentItem; // Return the unmodified item
      }
    });
    return { ...state, carts: updatedProductQuantity };
  }

  //decrement
  if (action.type === "SET_CART_ITEM_QUANTITY_DECREMENT") {
    let updatedProductQuantity = state?.carts?.map((currentItem) => {
      if (currentItem?._id === action?.payload?._id) {
        // if matched then decrement 1 after every click
        let decrementAmount = currentItem?.product_quantity - 1;

        // can't make quantity less than 1
        if (decrementAmount < 1) {
          decrementAmount = 1;
        }
        return {
          ...currentItem,
          product_quantity: decrementAmount,
        };
      } else {
        return currentItem; // Return the unmodified item
      }
    });
    return { ...state, carts: updatedProductQuantity };
  }
  // remove all data from cart
  if (action.type === "REMOVE_CART_DATA") {
    return {
      carts: [],
    };
  }

  return state;
};

export default CartReducer;

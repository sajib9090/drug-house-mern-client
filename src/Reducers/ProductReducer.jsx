const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT_LOADING":
      return {
        ...state,
        isProductLoading: true,
      };

    case "SET_API_DATA":
      return {
        ...state,
        isProductLoading: false,
        products: action.payload,
      };
    case "API_ERROR":
      return {
        ...state,
        isProductLoading: false,
        isProductError: true,
      };

    //single product
    case "SET_SINGLE_PRODUCT_LOADING":
      return {
        ...state,
        isSingleProductLoading: true,
      };

    case "SET_SINGLE_DATA":
      return {
        ...state,
        isSingleProductLoading: false,
        singleProduct: action.payload,
      };
    case "SET_SINGLE_ERROR":
      return {
        ...state,
        isSingleProductLoading: false,
        isSingleProductError: true,
      };

    default:
      return state;
  }
};

export default ProductReducer;

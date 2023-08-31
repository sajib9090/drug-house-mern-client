const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT_LOADING":
      return {
        ...state,
        isProductLoading: true,
      };

    case "SET_API_DATA":
      /* eslint-disable */
      const latestCategoryData = action.payload.filter((currentElement) => {
        return currentElement?.category === "latest";
      });
      const customerChoiceCategoryData = action.payload.filter(
        (currentElement) => {
          return currentElement?.category === "customer_choice";
        }
      );

      return {
        ...state,
        isProductLoading: false,
        products: action.payload,
        latestCategoryProducts: latestCategoryData,
        customerChoiceCategoryProducts: customerChoiceCategoryData,
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

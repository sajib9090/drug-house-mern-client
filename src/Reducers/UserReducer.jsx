const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_USER_LOADING":
      return {
        ...state,
        isAllUserLoading: true,
      };
    case "SET_ALL_USER_DATA":
      /* eslint-disable */
      const allCustomerData = action.payload.users.filter((currentUser) => {
        return currentUser.role === "customer";
      });
      const allSellerData = action.payload.users.filter((currentUser) => {
        return currentUser.role === "seller";
      });
      const allAdminData = action.payload.users.filter((currentUser) => {
        return currentUser.role === "admin";
      });
      return {
        ...state,
        isAllUserLoading: false,
        users: action.payload,
        allCustomer: allCustomerData,
        allSeller: allSellerData,
        allAdmin: allAdminData,
      };

    case "SET_ALL_USER_ERROR":
      return {
        ...state,
        isAllUserLoading: false,
        isAllUserError: true,
      };

    default:
      return state;
  }
};

export default UserReducer;

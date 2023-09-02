import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducers/UserReducer";
import axios from "axios";
import useAuth from "../Hooks/useAuth";

const UserContext = createContext();

const API = `${import.meta.env.VITE_API_URL}`;

// const headers = localStorage.getItem("access-token");

const initialState = {
  isAllUserLoading: false,
  isAllUserError: false,
  users: [],
  allCustomer: [],
  allSeller: [],
  allAdmin: [],
};

const UserProvider = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  // GET ALL USERS FUNCTION
  const getUsers = async (url) => {
    dispatch({ type: "SET_ALL_USER_LOADING" });
    try {
      const res = await axios.get(url);
      const users = await res.data;
      dispatch({ type: "SET_ALL_USER_DATA", payload: users });
    } catch (error) {
      dispatch({ type: "SET_ALL_USER_ERROR" });
    }
  };

  //ALL USERS
  useEffect(() => {
    getUsers(`${API}/all/users`);
  }, [user]);
  return (
    <UserContext.Provider value={{ ...state }}>{children}</UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, UserContext, useUserContext };

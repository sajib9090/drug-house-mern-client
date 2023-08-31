import { createContext, useContext, useEffect, useState } from "react";
import { useProductContext } from "./ProductContext";
import FilterState from "../Reducers/FilterState";

const FilterProductContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  //i'm trying this one another way without use usereducer
  //getting shorting value
  const [selectedOption, setSelectedOption] = useState("sortbydefault");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //sorting/filter by search value
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  };

  //set sorting value by category
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    FilterState(selectedOption, products, setFilteredProducts, searchInput);
  }, [products, selectedOption, searchInput]);

  //return value
  return (
    <FilterProductContext.Provider
      value={{
        filteredProducts,
        handleOptionChange,
        selectedOption,
        handleInputChange,
        searchInput,
      }}
    >
      {children}
    </FilterProductContext.Provider>
  );
};

export const useFilterProductContext = () => {
  return useContext(FilterProductContext);
};

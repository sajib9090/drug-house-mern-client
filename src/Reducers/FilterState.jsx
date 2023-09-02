const FilterState = (
  selectedOption,
  products,
  setFilteredProducts,
  searchInput
) => {
  //
  if (searchInput) {
    const sortBySearchValue = products.filter((currentElement) =>
      currentElement.medicine_name.toLowerCase().includes(searchInput)
    );
    setFilteredProducts(sortBySearchValue);
    return;
  }
  if (selectedOption === "sortbydefault") {
    setFilteredProducts(products);
  }
  //
  if (selectedOption === "PriceLowToHigh") {
    const sortedProducts = [...products].sort(
      (a, b) => a.medicine_price_per_unit - b.medicine_price_per_unit
    );
    setFilteredProducts(sortedProducts);
  }
  //
  if (selectedOption === "PriceHighToLow") {
    const sortedProducts = [...products].sort(
      (a, b) => b.medicine_price_per_unit - a.medicine_price_per_unit
    );
    setFilteredProducts(sortedProducts);
  }
  //
  if (selectedOption === "RatingsLowToHigh") {
    const sortedProducts = [...products].sort((a, b) => a.ratings - b.ratings);
    setFilteredProducts(sortedProducts);
  }
  //
  if (selectedOption === "RatingsHighToLow") {
    const sortedProducts = [...products].sort((a, b) => b.ratings - a.ratings);
    setFilteredProducts(sortedProducts);
  }
  //
  if (selectedOption === "ProductAZ") {
    const sortedProducts = [...products].sort((a, b) =>
      a.medicine_name.localeCompare(b.medicine_name)
    );
    setFilteredProducts(sortedProducts);
  }
  //
  if (selectedOption === "ProductZA") {
    const sortedProducts = [...products].sort((a, b) =>
      b.medicine_name.localeCompare(a.medicine_name)
    );
    setFilteredProducts(sortedProducts);
  }
};

export default FilterState;

import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { BsFillEyeFill, BsSearch } from "react-icons/bs";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useProductContext } from "../../GlobalContext/ProductContext";
import React, { useState } from "react";
import Loader from "../../Components/Loader/Loader";
import useAuth from "../../Hooks/UseAuth";
import { useFilterProductContext } from "../../GlobalContext/FilterContext";

const Shop = () => {
  const { user } = useAuth();
  const state = useProductContext();
  const {
    filteredProducts,
    handleOptionChange,
    selectedOption,
    handleInputChange,
    searchInput,
  } = useFilterProductContext();
  const { isProductLoading, isProductError } = state;

  return (
    <div className="max-w-7xl mx-auto dark:bg-dark-2">
      <div className="h-[50vh] md:h-[80vh] md:max-h-[400px] shop">
        <div className="bg-sh h-full w-full bg-opacity-sh-70 dark:bg-deep-sh dark:bg-opacity-sh-90 bg-opacity-75 flex justify-center items-center"></div>
      </div>
      <div className="relative">
        <div className="text-center mt-10">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex items-center justify-center">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered rounded-l-3xl rounded-r-none h-[40px] input-success w-full max-w-[180px] md:max-w-xs px-6"
                value={searchInput}
                onChange={handleInputChange}
              />
              <button className="bg-sh text-white rounded-r-3xl rounded-l-none h-[40px] px-6">
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-end items-center my-4 md:my-0 md:absolute md:right-1 md:bottom-2">
          <div className="">
            <select
              className="border-2 border-sh text-sh rounded-sm"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="sortbydefault">Sort By Default</option>
              <option value="PriceLowToHigh">Price: Low to High</option>
              <option value="PriceHighToLow">Price: High to Low</option>
              <option value="RatingsLowToHigh">Ratings: Low to High</option>
              <option value="RatingsHighToLow">Ratings: High to Low</option>
              <option value="ProductAZ">Product: A-Z</option>
              <option value="ProductZA">Product: Z-A</option>
            </select>
          </div>
        </div>
      </div>
      {isProductError ? (
        <div className="h-[60%] flex justify-center items-center py-16">
          <h1 className="text-xl dark:text-white">
            ⚠️Oops.Something Went Wrong.
          </h1>
        </div>
      ) : (
        <>
          {isProductLoading ? (
            <Loader />
          ) : (
            <>
              {filteredProducts?.length === 0 ? (
                <div className="h-screen flex justify-center">
                  <h2 className="text-center dark:text-white text-3xl font-bold mt-8">
                    No Product Found
                  </h2>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 px-4">
                  {filteredProducts?.map((product) => (
                    <React.Fragment key={product?._id}>
                      {user?.email === product?.seller_email ? (
                        <ProductCard
                          key={product?._id}
                          img={product?.medicine_image}
                          views={
                            product?.views ? (
                              <span className="flex items-center text-xs">
                                <BsFillEyeFill className="h-4 w-4 text-sh mr-1" />
                                {product.views >= 1000000000
                                  ? (product.views / 1000000000).toFixed(1) +
                                    " billion"
                                  : product.views >= 1000000
                                  ? (product.views / 1000000).toFixed(1) +
                                    " million"
                                  : product.views >= 1000
                                  ? (product.views / 1000).toFixed(1) + "k"
                                  : product.views}
                              </span>
                            ) : (
                              <span className="flex items-center text-xs">
                                <BsFillEyeFill className="h-4 w-4 text-sh mr-1" />
                                {"No views"}
                              </span>
                            )
                          }
                          ratings={product?.ratings}
                          title={
                            product.medicine_name.length > 50
                              ? product.medicine_name.slice(0, 50) + "..."
                              : product.medicine_name
                          }
                          price={product?.medicine_price_per_unit}
                          button={"Buy Now"}
                          isDisabled={true}
                          stock={
                            product.medicine_available_quantity == 0 ? (
                              <span className="text-red-600 flex items-center">
                                <RxCross2 className="text-red-600 h-4 w-4" />
                                Out of Stock
                              </span>
                            ) : (
                              <span className="text-sh flex items-center">
                                <AiOutlineCheck className="text-sh h-4 w-4" />
                                In Stock
                              </span>
                            )
                          }
                        />
                      ) : (
                        <ProductCard
                          key={product?._id}
                          img={product?.medicine_image}
                          views={
                            product?.views ? (
                              <span className="flex items-center text-xs">
                                <BsFillEyeFill className="h-4 w-4 text-sh mr-1" />
                                {product.views >= 1000000000
                                  ? (product.views / 1000000000).toFixed(1) +
                                    " billion"
                                  : product.views >= 1000000
                                  ? (product.views / 1000000).toFixed(1) +
                                    " million"
                                  : product.views >= 1000
                                  ? (product.views / 1000).toFixed(1) + "k"
                                  : product.views}
                              </span>
                            ) : (
                              <span className="flex items-center text-xs">
                                <BsFillEyeFill className="h-4 w-4 text-sh mr-1" />
                                {"No views"}
                              </span>
                            )
                          }
                          ratings={product?.ratings}
                          title={
                            product.medicine_name.length > 50
                              ? product.medicine_name.slice(0, 50) + "..."
                              : product.medicine_name
                          }
                          price={product?.medicine_price_per_unit}
                          button={"Buy Now"}
                          isDisabled={false}
                          to={`/shop/product_details/${product?._id}`}
                          stock={
                            product.medicine_available_quantity == 0 ? (
                              <span className="text-red-600 flex items-center">
                                <RxCross2 className="text-red-600 h-4 w-4" />
                                Out of Stock
                              </span>
                            ) : (
                              <span className="text-sh flex items-center">
                                <AiOutlineCheck className="text-sh h-4 w-4" />
                                In Stock
                              </span>
                            )
                          }
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;

import Loader from "../../../Components/Loader/Loader";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { useProductContext } from "../../../GlobalContext/ProductContext";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { BsFillEyeFill } from "react-icons/bs";
import React from "react";
import useAuth from "../../../Hooks/UseAuth";
const Products = () => {
  const { user } = useAuth();
  const state = useProductContext();
  const { customerChoiceCategoryProducts, isProductLoading, isProductError } =
    state;

  return (
    <div className="md:h-[630px] px-4 md:px-8">
      {isProductLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h1 className=" text-3xl font-extrabold py-10 dark:text-white">
              Customer's Choice
            </h1>
          </div>
          {isProductError ? (
            <div className="h-[60%] flex justify-center items-center">
              <h1 className="text-xl dark:text-white">
                ⚠️Oops.Something Went Wrong.
              </h1>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {customerChoiceCategoryProducts?.slice(0, 4).map((product) => (
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
    </div>
  );
};

export default Products;

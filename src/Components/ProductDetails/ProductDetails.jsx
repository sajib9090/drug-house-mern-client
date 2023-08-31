import { FaFacebook, FaLinkedin, FaPinterest, FaTwitter } from "react-icons/fa";
import payment from "../../assets/shikder-drug-house-resources/images/payment.png";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

import StarRating from "../StarRating/StarRating";
import Shipping from "../../Pages/Home/CustomerChoice/Shipping";
import { useProductContext } from "../../GlobalContext/ProductContext";
import Loader from "../Loader/Loader";

const ProductDetails = () => {
  const {
    getSingleProduct,
    isSingleProductLoading,
    isSingleProductError,
    singleProduct,
  } = useProductContext();

  const { id } = useParams();

  useEffect(() => {
    getSingleProduct(`${import.meta.env.VITE_API_URL}/product/${id}`);
  }, []);

  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState("");

  const socials = [
    {
      id: 1,
      link: <FaFacebook />,
    },
    {
      id: 2,
      link: <FaTwitter />,
    },
    {
      id: 3,
      link: <FaPinterest />,
    },
    {
      id: 4,
      link: <FaLinkedin />,
    },
  ];

  return (
    <>
      {isSingleProductLoading ? (
        <Loader />
      ) : (
        <>
          {isSingleProductError ? (
            <>
              <div className="h-[100vh] flex justify-center items-center py-16">
                <h1 className="text-xl dark:text-white">
                  ⚠️Oops.Something Went Wrong.
                </h1>
              </div>
            </>
          ) : (
            <div className=" grid grid-cols-1 md:grid-cols-12 gap-2 mb-4 max-w-7xl mx-auto pt-24 dark:bg-dark-1">
              <div className=" md:col-span-10 shadow-2xl">
                <div className="text-base font-semibold text-sh pl-4">
                  <Link to={"/"} className="hover:underline">
                    Home
                  </Link>
                  /
                  <Link to={"/shop"} className="hover:underline">
                    Shop
                  </Link>
                  /
                  <span className="font-thin">
                    {singleProduct?.medicine_name}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className=" overflow-hidden">
                    <img
                      src={singleProduct?.medicine_image}
                      className="transition hover:scale-125 duration-1000 overflow-hidden"
                      alt="Product image"
                    />
                  </div>
                  <div className="mt-10 px-6">
                    <h2 className="text-xl md:text-3xl font-bold dark:text-white">
                      {singleProduct?.medicine_name}
                    </h2>
                    <p className="text-base mt-2 capitalize dark:text-white">
                      {singleProduct?.medicine_generic}
                    </p>
                    <p className="text-base mt-1 capitalize dark:text-white">
                      {singleProduct?.medicine_dosage_form}
                    </p>

                    <p className="mt-4 flex flex-col md:flex-row md:items-center gap-2 text-base dark:text-gray-300">
                      Customer Review
                      <StarRating value={singleProduct?.ratings} size={25} />
                      <p className="text-sm">
                        {singleProduct?.ratings
                          ? `(${singleProduct.ratings})`
                          : ""}
                      </p>
                    </p>

                    <div className="divider mt-6"></div>
                    <p className="text-xl text-sh">
                      Price: TK. {singleProduct?.medicine_price_per_unit}
                    </p>
                    <p className="">
                      {singleProduct?.medicine_available_quantity == 0 ? (
                        <span className="text-red-600 flex items-center">
                          <RxCross2 className="text-red-600 h-4 w-4" />
                          Out of Stock
                        </span>
                      ) : (
                        <span className="text-sh flex items-center">
                          <AiOutlineCheck className="text-sh h-4 w-4" />
                          In Stock{" "}
                          <span className="text-xs ml-1">
                            ({singleProduct?.medicine_available_quantity})
                          </span>
                        </span>
                      )}
                    </p>
                    <ul className="pl-4 dark:text-gray-400 mt-5 list-disc">
                      <li>Integer ultrices tincidunt.</li>
                      <li>suspendisse fusce pede quam id.</li>
                    </ul>
                    <p className="pt-2 text-xs text-red-600">{quantityError}</p>
                    <div className="flex items-center gap-6 mt-4 ">
                      <div className="flex">
                        <button
                          onClick={() => {
                            if (
                              singleProduct.medicine_available_quantity == 0
                            ) {
                              return setQuantityError(
                                "Out Of Stock. Try Later."
                              );
                            } else if (
                              singleProduct.medicine_available_quantity ==
                              quantity
                            ) {
                              return setQuantityError(
                                "You Can't Buy More Than We Have. Thank You."
                              );
                            } else {
                              setQuantity(quantity + 1);
                              setQuantityError("");
                            }
                          }}
                          className="text-lg font-bold duration-700 dark:text-white bg-sh hover:bg-opacity-sh-70 hover:rounded-3xl text-white w-8 h-8 text-center"
                        >
                          +
                        </button>
                        <button className="w-12 md:w-16 dark:text-white">
                          {quantity}
                        </button>
                        {singleProduct?.medicine_available_quantity == 0 ? (
                          <button
                            onClick={() => {
                              if (quantity > 1) {
                                setQuantity(quantity - 1);
                                setQuantityError("");
                              }
                              // else if (quantity == 1) {
                              //   setQuantityError("You Should Buy At Least One.");
                              // }
                            }}
                            className="text-lg font-bold duration-700 dark:text-white bg-sh hover:bg-opacity-sh-70 hover:rounded-3xl text-white w-8 h-8 text-center cursor-not-allowed"
                            disabled
                          >
                            -
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (quantity > 1) {
                                setQuantity(quantity - 1);
                                setQuantityError("");
                              } else if (quantity == 1) {
                                setQuantityError(
                                  "You Should Buy At Least One."
                                );
                              }
                            }}
                            className="text-lg font-bold duration-700 dark:text-white bg-sh hover:bg-opacity-sh-70 hover:rounded-3xl text-white w-8 h-8 text-center"
                          >
                            -
                          </button>
                        )}
                      </div>
                      <button className="bg-sh rounded hover:rounded-3xl text-white h-[40px] w-[120px] hover:bg-opacity-sh-70 duration-700">
                        {/* <AiOutlineLoading3Quarters className="animate-spin mx-auto h-6 w-6" /> */}
                        Add To Cart
                      </button>
                    </div>
                    <div className="divider mt-5"></div>
                    <div className="flex items-center gap-2 mb-3">
                      <p className="dark:text-gray-400">Shareit</p>
                      <div className="flex gap-2">
                        {socials.map((social) => (
                          <p
                            key={social.id}
                            className="w-7 h-7 flex justify-center items-center text-white px-2 bg-sh cursor-pointer hover:bg-sh hover:bg-opacity-sh-70 duration-700 rounded-md hover:scale-105"
                          >
                            {social.link}
                          </p>
                        ))}
                      </div>
                    </div>
                    <img src={payment} alt="Payment" />
                  </div>
                </div>
              </div>
              <div className="shadow-2xl md:col-span-2">
                <Shipping />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;

import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../GlobalContext/CartContext";
import { CiCircleRemove } from "react-icons/ci";
import Marquee from "react-fast-marquee";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useAuth from "../../Hooks/UseAuth";

const Cart = () => {
  const { user } = useAuth();
  const { carts, handleRemoveAll, handlePlus, handleMinus, itemRemove } =
    useCartContext();
  const navigate = useNavigate();

  const deliveryCharge = 60;

  const subTotal = carts
    .reduce(
      (sum, item) =>
        item?.product_price_per_unit * item?.product_quantity + sum,
      0
    )
    .toFixed(2);
  const subTotalQuantity = carts.reduce(
    (sum, item) => item?.product_quantity + sum,
    0
  );

  //modal
  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const removeAll = () => {
    handleRemoveAll();
    setIsOpen(false);
  };

  const handleCheckOut = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/shop");
    }
  };

  return (
    <div className="pt-24 max-w-7xl mx-auto dark:bg-dark-1 min-h-screen">
      <div className="flex items-center justify-between px-4 md:px-6 mb-4">
        <div>
          <h3 className="text-black dark:text-white font-semibold text-lg md:text-2xl">
            Cart - {carts.length} items
          </h3>
          <h3 className="text-black dark:text-white font-semibold text-base md:text-lg">
            Cart total - {subTotalQuantity} items
          </h3>
        </div>
        <p className="underline text-sh font-medium md:font-bold text-base md:text-lg cursor-pointer animate-pulse">
          History
        </p>
      </div>
      {carts?.length === 0 ? (
        <div className="h-[65vh] flex flex-col justify-center items-center">
          <h1 className="text-3xl text-center dark:text-white font-medium">
            Your Cart is empty.. <br className="md:hidden" />
            <Link className="text-sh underline" to={"/shop"}>
              Please Add Product
            </Link>
            .
          </h1>
        </div>
      ) : (
        <>
          <div>
            <h3 className="text-center font-semibold text-lg my-4 dark:text-white">
              Total Price: TK.{" "}
              <span className="font-extrabold text-sh">{subTotal}</span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  {/* <th className="hidden md:block">
                    <label className="dark:text-white">No.</label>
                  </th> */}
                  <th className="dark:text-white">Items</th>
                  <th className="dark:text-white">Price</th>
                  <th className="dark:text-white">Quantity</th>
                  <th className="dark:text-white">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carts?.map((cart, index) => (
                  <tr key={index}>
                    {/* <th className="hidden md:block">
                      <label>
                        <p className="dark:text-white">{index + 1}</p>
                      </label>
                    </th> */}
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={cart?.product_image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold dark:text-white">
                            {cart?.product_name?.length > 20
                              ? cart?.product_name?.slice(0, 20) + "..."
                              : cart?.product_name}
                          </div>
                          <div className="text-sm opacity-50 dark:text-gray-200">
                            {cart?.product_group?.length > 20
                              ? cart?.product_group?.slice(0, 20) + "..."
                              : cart?.product_group}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="dark:text-white">
                        TK. {cart?.product_price_per_unit}
                      </p>
                    </td>
                    <td>
                      <div className="flex items-center">
                        <button
                          onClick={() => handlePlus(cart)}
                          className="bg-sh rounded-l-sm font-bold w-[20px] h-[34px] text-base text-white "
                        >
                          +
                        </button>
                        <button className="w-[50px] border border-gray-300 py-1 dark:text-white font-bold text-base px-2">
                          {cart?.product_quantity}
                        </button>
                        <button
                          onClick={() => handleMinus(cart)}
                          className="bg-red-500 w-[20px] h-[34px] rounded-r-sm font-bold text-base text-white"
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs dark:text-white">
                        TK.{" "}
                        {(
                          cart?.product_price_per_unit * cart?.product_quantity
                        ).toFixed(2)}
                      </button>
                    </th>
                    <th>
                      <button onClick={() => itemRemove(cart)}>
                        <CiCircleRemove className="h-6 w-6 dark:text-white" />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-12 mx-4 md:mx-0">
            <div className="flex items-center justify-end px-2 md:px-16">
              <Link to={"/shop"}>
                <p className="text-sh hover:underline duration-500 animate-pulse pr-4">
                  Buy More?
                </p>
              </Link>
              |
              <p
                onClick={openModal}
                className=" text-red-600 hover:opacity-60 duration-700 hover:underline cursor-pointer pl-4"
              >
                Clear Cart
              </p>
            </div>
            <div className="text-center my-6">
              <Marquee speed={90}>
                <p className="tracking-wider dark:text-white">
                  If you want to delivery charge free. Please order more than{" "}
                  <span className="font-bold text-sh">1000</span> TK.
                </p>
              </Marquee>
            </div>
            <div className="max-w-sm mx-auto">
              <div className="flex justify-between">
                <p className="dark:text-white">Sub Total:</p>
                <p className="dark:text-white">
                  TK. <span className="text-sh font-bold">{subTotal}</span>
                </p>
              </div>
              <div className="divider my-0 dark:border-b dark:border-white"></div>
              <div className="flex justify-between">
                <p className="dark:text-white">Delivery Charge:</p>
                <p className="dark:text-white">
                  TK.{" "}
                  <span className="text-sh font-bold">
                    {subTotal > 1000 ? "Free" : deliveryCharge}
                  </span>
                </p>
              </div>
              <div className="divider my-0 dark:border-b dark:border-white"></div>
              <div className="flex justify-between">
                <p className="dark:text-white">Grand Total:</p>
                <p className="dark:text-white">
                  TK.{" "}
                  <span className="text-sh font-bold">
                    {subTotal > 1000
                      ? subTotal
                      : (parseFloat(subTotal) + deliveryCharge).toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="divider my-0 dark:border-b dark:border-white"></div>
              <div className="text-right pb-10 mt-2">
                <button
                  onClick={handleCheckOut}
                  className="bg-sh py-[5px] px-6 text-white rounded-3xl hover:bg-opacity-sh-75 duration-700"
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure want to remove all item from the cart?
                  </Dialog.Title>
                  {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div> */}

                  <div className="mt-4 flex justify-center space-x-2">
                    <button
                      type="button"
                      className="rounded-3xl border border-transparent bg-red-600 px-4 py-1 text-sm font-medium text-white hover:bg-opacity-70"
                      onClick={removeAll}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="rounded-3xl border border-transparent bg-sh px-4 py-1 text-sm font-medium text-white hover:bg-opacity-sh-70"
                      onClick={closeModal}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Cart;

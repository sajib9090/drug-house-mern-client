import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Provider/AuthProvider";
import { router } from "./Routes/Routes";
import { ProductProvider } from "./GlobalContext/ProductContext";
import { FilterContextProvider } from "./GlobalContext/FilterContext";
import { CartProvider } from "./GlobalContext/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <div className="bg-white dark:bg-[#010313]">
      <AuthProvider>
        <ProductProvider>
          <FilterContextProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </FilterContextProvider>
        </ProductProvider>
      </AuthProvider>
    </div>
  </React.StrictMode>
);

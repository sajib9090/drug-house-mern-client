import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Provider/AuthProvider";
import { router } from "./Routes/Routes";
import { ProductProvider } from "./GlobalContext/ProductContext";
import { FilterContextProvider } from "./GlobalContext/FilterContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <div className="bg-white dark:bg-[#010313]">
      <AuthProvider>
        <ProductProvider>
          <FilterContextProvider>
            <RouterProvider router={router} />
          </FilterContextProvider>
        </ProductProvider>
      </AuthProvider>
    </div>
  </React.StrictMode>
);

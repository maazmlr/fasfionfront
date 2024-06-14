import React from "react";
import { useLocation } from "react-router-dom";

const ProductLayout = ({ children }) => {
  const { pathname } = useLocation();
  const items = pathname.split("/");
  return (
    <div>
      <div className="min-h-screen">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className=" text-purple border-1 border-purple-900 text-center text-2xl font-bold uppercase bg-white p-4 rounded-md">
              {items[3] ? items[3] : items[2]}
            </h2>

            <div className="grid grid-cols-2 gap-6 mt-10 border-b-2 lg:mt-16 lg:gap-4 lg:grid-cols-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;

import { json, useParams } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../url";
import { Button } from "@nextui-org/react";

const ProductDetail = () => {
  const [item, setItem] = useState();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url + "/product/get-product/" + id);
      setItem(response.data.data);
    };
    fetchData();
  }, []);

  function addToCart() {
    // Retrieve the existing items array from localStorage
    let items = JSON.parse(localStorage.getItem("items")) || [];

    // Check if the new item is already in the array
    const itemExists = items.some((ite) => ite?._id === item?._id);

    // If the item doesn't exist, add it to the array
    if (!itemExists) {
      items.push({ ...item, quantity: 1 });
      // Save the updated array back to localStorage
      localStorage.setItem("items", JSON.stringify(items));
      console.log("Item added successfully.");
    } else {
      console.log("Item already exists in the array.");
    }
  }

  console.log(item);
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <section className="py-12 md:py-20">
        <div className="max-w-screen-xl px-4 mx-auto lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20">
            <div className="lg:col-span-1">
              <ImageCarousel img={item?.image} />
            </div>
            <div className="mt-8 lg:mt-0 lg:col-span-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {item?.name}
              </h1>
              <div className=" flex-row sm:flex-row sm:items-center sm:gap-4 mt-4">
                <p className="text-lg p-4 border-2 mb-4 border-purple-900 text-center text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Category:</span>{" "}
                  {item?.category}
                </p>
                <p className=" text-lg p-4 border-2 mb-4 border-purple-900 text-center text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Sub-Category:</span>{" "}
                  {item?.subcategory}
                </p>
              </div>
              <div className=" flex-col sm:flex-row sm:items-center sm:gap-4 mt-4">
                <p className="text-lg mb-4 font-medium text-gray-900 dark:text-gray-300">
                  <span className="font-semibold">Stock:</span> {item?.stock}
                </p>
                <hr  className="mb-2"/>
                <p className="mt- sm:mt-0  text-lg font-medium text-gray-900 dark:text-gray-300">
                  <span className="font-semibold">Price:</span> {item?.price}{" "}
                  Rs/
                </p>
              </div>
              <p className="mt-6 text-lg">
                Description
                <p className=" text-gray-600 dark:text-gray-400">
                  {" "}
                  {item?.description}
                </p>
              </p>
              <div className="mt-8 sm:mt-10 flex justify-start">
                <Button
                  onClick={item?.stock > 2 ? addToCart : null}
                  className={`  bg-white focus:ring-blue-300 text-purple border-1 border-purple-900 px-6 py-3 rounded-lg text-lg font-medium ${
                    item?.stock > 2 ? "" : "bg-gray-500 cursor-not-allowed"
                  }`}
                  disabled={item?.stock <= 2}
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  {item?.stock > 2 ? "Add to cart" : "Out of Stock"}
                </Button>
              </div>
              <hr className="my-8 border-gray-300 dark:border-gray-700" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;

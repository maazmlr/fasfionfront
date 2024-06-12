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
    <div>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <ImageCarousel img={item?.image} />
            </div>
            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {item?.name}
              </h1>

              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <div className="flex items-center gap-1">
                    <p className="text-black">Category : {item?.category}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-black ml-4">
                      Sub-Category : {item?.subcategory}
                    </p>
                  </div>
                </div>
              </div>
              <p className="my-4">Stock: {item?.stock}</p>

              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {item?.price} Rs/
              </p>
              <p className="my-6 text-gray-500 dark:text-gray-400">
                {item?.description}
              </p>
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <Button
                  onClick={item?.stock > 2 && addToCart}
                  title=""
                  className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  {item?.stock > 2 ? "Add to cart" : "Out of Stock"}
                </Button>
              </div>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;

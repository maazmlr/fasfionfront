import { useParams } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../url";
import { Button } from "@nextui-org/react";
import { Radio, RadioGroup } from "@headlessui/react";
import { notification } from "antd";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const sizes = [
  { name: "XXS", inStock: true },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: true },
];
const colors = [
  { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
  { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
  { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
];
const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  console.log(selectedSize);
  const [item, setItem] = useState();
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (msg) => {
    api.info({
      message: `SUCCESS`,
      description: msg,
      placement: "top",
    });
  };
  console.log(item);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url + "/product/get-product/" + id);
      setItem(response.data.data);
    };
    fetchData();
  }, [id]);

  function addToCart() {
    console.log(selectedColor);
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color before adding to cart.");
      return;
    }

    // Retrieve the existing items array from localStorage
    let items = JSON.parse(localStorage.getItem("items")) || [];

    // Check if the new item with the selected size is already in the array
    const itemExists = items.some(
      (ite) =>
        ite?._id === item?._id &&
        ite?.size === selectedSize &&
        ite?.color == selectedColor
    );

    // If the item doesn't exist, add it to the array
    if (!itemExists) {
      items.push({
        ...item,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
      });
      // Save the updated array back to localStorage
      openNotification("product added in cart");
      localStorage.setItem("items", JSON.stringify(items));
      console.log("Item added successfully.");
      
    } else {
      console.log("Item already exists in the array.");
      openNotification("product already in cart");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      {contextHolder}

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
              <div className="flex-row sm:flex-row sm:items-center sm:gap-4 mt-4">
                <p className="text-lg p-4 border-2 mb-4 border-purple-900 text-center text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Category:</span>{" "}
                  {item?.category}
                </p>
                <p className="text-lg p-4 border-2 mb-4 border-purple-900 text-center text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Sub-Category:</span>{" "}
                  {item?.subcategory}
                </p>
              </div>
              <div className="flex-col sm:flex-row sm:items-center sm:gap-4 mt-4">
                <p className="text-lg mb-4 font-medium text-gray-900 dark:text-gray-300">
                  <span className="font-semibold">Stock:</span> {item?.stock}
                </p>
                <hr className="mb-2" />
                <p className="mt- sm:mt-0 text-lg font-medium text-gray-900 dark:text-gray-300">
                  <span className="font-semibold">Price:</span> {item?.price}{" "}
                  Rs/
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="flex items-center space-x-3"
                  >
                    {item?.color?.map((color) => (
                      <Radio
                        key={color}
                        value={color}
                        aria-label={color}
                        className={({ focus, checked }) =>
                          classNames(
                            color,
                            focus && checked ? "ring ring-offset-1" : "",
                            !focus && checked ? "ring-2" : "",
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                          )
                        }
                      >
                        <span
                          style={{ background: color }}
                          aria-hidden="true"
                          className={classNames(
                            // `bg-${color}-400`,
                            `h-8 w-8  bg-${color}-600 rounded-full border border-black border-opacity-10`
                          )}
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {item?.size?.map((size) => (
                      <Radio
                        key={size}
                        value={size}
                        // disabled={!size.inStock}
                        className={({ focus }) =>
                          classNames(
                            size
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            focus ? "ring-2 ring-indigo-500" : "",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({ checked, focus }) => (
                          <>
                            <span>{size}</span>
                            {true ? (
                              <span
                                className={classNames(
                                  checked
                                    ? "border-indigo-500"
                                    : "border-transparent",
                                  focus ? "border" : "border-2",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
              <p className="mt-6 text-lg">
                Description
                <p className="text-gray-600 dark:text-gray-400">
                  {item?.description}
                </p>
              </p>

              <div className="mt-8 sm:mt-10 flex justify-start">
                <Button
                  onClick={item?.stock > 2 ? addToCart : null}
                  className={`bg-white focus:ring-blue-300 text-purple border-1 border-purple-900 px-6 py-3 rounded-lg text-lg font-medium ${
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

import React from "react";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { url } from "../../url.js";

const ProductCard = ({ product }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    console.log(product._id);

    const res = await axios.delete(
      `${url}/product/delete-product/${product._id}`
    );
    console.log(res);
    // onDelete(product._id);
    console.log("jsjsjsjjsjjs");
  };

  return (
    <div
      className={`bg-white ${
        isDeleting && "hidden"
      } shadow-md rounded-lg p-6 mb-6 `}
    >
      <img
        src={product.image[0]}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Category:</span> {product.category}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Sub-Category:</span>{" "}
        {product.subcategory}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Available Colors:</span>{" "}
        {product.color.join(", ")}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Available Sizes:</span>{" "}
        {product.size.join(", ")}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Price:</span> {product.price} Rs
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Stock:</span> {product.stock}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Description:</span>{" "}
        {product.description}
      </p>
      <Button
        onClick={() => handleDelete()}
        disabled={isDeleting}
        className={`bg-red-500 text-white px-4 py-2 rounded-lg mt-4 ${
          isDeleting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        delete
      </Button>
    </div>
  );
};

export default ProductCard;

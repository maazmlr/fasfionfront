import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../url.js";
import ProductCard from "./Product.jsx";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url + "/product/get-all-product");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

 

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

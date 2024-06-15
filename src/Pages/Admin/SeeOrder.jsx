import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../url";
import "./order.css";
const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(url + "/order/get-all-order");
        console.log(response.data);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Order List</h1>
      {orders.length === 0 ? (
        <div className="text-lg text-gray-700">No orders found</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order._id} className="py-4">
              <div className="text-blue-600 text-lg font-semibold">
                Order ID: {order._id}
              </div>
              <p className="mt-2">
                <strong>Full Name:</strong> {order.fullName}
              </p>
              <p>
                <strong>Address:</strong> {order.address}
              </p>
              <p>
                <strong>City:</strong> {order.city}
              </p>
              <p>
                <strong>Phone Number:</strong> {order.phoneNumber}
              </p>
              <p>
                <strong>WhatsApp Number:</strong> {order.whatsappNumber}
              </p>
              <p>
                <strong>Zipcode:</strong> {order.zipcode}
              </p>
              <h3 className="text-lg font-semibold mt-4">Products:</h3>
              <ul className="divide-y divide-gray-200">
                {order.products.map((product) => (
                  <li key={product._id} className="py-2">
                    <p>
                      <strong>Name:</strong> {product.name}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {product.quantity}
                    </p>
                    <p>
                      <strong>Size:</strong> {product.size}
                    </p>
                    <p>
                      <strong>Color:</strong> {product.color}
                    </p>
                    <p>
                      <strong>Total Price:</strong> $
                      {product.total_price.toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;

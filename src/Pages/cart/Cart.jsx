import React, { useState, useEffect } from "react";
import SignupForm from "./CartForm";
import { Button, notification } from "antd";
import axios from "axios";
import { url } from "../../url";
import { useNavigate } from "react-router-dom";

const Products = ({
  _id,
  img,
  name,
  price,
  quantity = 1,
  onQuantityChange,
  onRemove,
}) => {
  const increaseQuantity = () => {
    onQuantityChange(_id, quantity + 1);
  };

  const decreaseQuantity = () => {
    onQuantityChange(_id, quantity > 1 ? quantity - 1 : 1);
  };

  return (
    <li id={`product-${_id}`} className="flex items-center gap-4">
      <img src={img} alt="" className="size-16 rounded object-cover" />

      <div>
        <h3 className="text-sm text-gray-900">{name}</h3>
        <p className="text-sm text-gray-900">Price: ${price}</p>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={decreaseQuantity}
            className="text-gray-600 transition hover:text-red-600"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="text-gray-600 transition hover:text-red-600"
          >
            +
          </button>
        </div>

        <button
          onClick={() => onRemove(_id)}
          className="text-gray-600 transition hover:text-red-600"
        >
          <span className="sr-only">Remove item</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

const Cart = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({}); // State to hold form data
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotification = (msg) => {
    api.info({
      message: `SUCCESS`,
      description: msg,
      placement: "top",
    });
  };
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  const updateQuantity = (_id, newQuantity) => {
    const updatedItems = items.map((item) =>
      item._id === _id ? { ...item, quantity: newQuantity } : item
    );
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const removeItem = (_id) => {
    const updatedItems = items.filter((item) => item._id !== _id);
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => {
      const itemTotal = item.price * item.quantity;
      return acc + itemTotal;
    }, 0);
  };

  const total = calculateTotal();

  useEffect(() => {
    const itemsSummary = items.map((item) => ({
      _id: item._id,
      total_price: item.price * item.quantity,
      quantity: item.quantity,
    }));
    console.log(itemsSummary);
  }, [items]);

  const handleCheckout = () => {
    // Construct the object with product details and form data
    const checkoutData = {
      products: items.map((item) => ({
        _id: item._id,
        name: item.name,
        total_price: item.price * item.quantity,
        quantity: item.quantity,
      })),
      ...formData,
    };

    console.log(checkoutData);
    if (Object.keys(formData).length !== 0) {
      axios
        .post(url + "/order/add-order", checkoutData)
        .then((res) => console.log(res))
        .catch((res) => console.log(res));
      console.log(typeof Object.keys(formData));
      localStorage.removeItem("items");
      navigate("/");
      openNotification("check out successfull");
    } else {
      openNotification("Please fill delivery details before checkout");
    }
  };

  const handleFormSubmit = (values) => {
    setFormData(values); // Store form data when submitted
  };

  return (
    <div>
      <section className="min-h-screen">
        {contextHolder}
        {items.length === 0 ? (
          <h1 className="flex justify-center mt-20 text-black text-2xl">
            No items
          </h1>
        ) : (
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <header className="text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Your Cart
                </h1>
              </header>

              <div className="mt-8">
                <ul className="space-y-4">
                  {items.map((item) => (
                    <Products
                      key={item._id}
                      _id={item._id}
                      img={item.image[0]}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onQuantityChange={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>${total.toFixed(2)}</dd>
                      </div>
                    </dl>

                    <div className="flex justify-end">
                      <Button
                        className="block rounded bg-white  px-6  border-1 border-purple-900 text-sm text-gray-100 transition hover:bg-gray-600"
                        onClick={handleCheckout}
                      >
                        Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <SignupForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default Cart;

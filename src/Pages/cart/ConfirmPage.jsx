import React from "react";
import { NavLink, useParams } from "react-router-dom";

const ConfirmPage = () => {
  const { id } = useParams();
  return (
    <div className="h-screen  flex justify-center items-center">
      <div>
        <h1 className="font-extrabold text-2xl mb-6">Order Confirmed: #{id}</h1>
        {/* <p>Thank you for your purchase.</p>
        <p>
          Your order details will be sent to the email address provided during
          checkout.
        </p> */}
        <NavLink
          to={"/"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 mx-10 rounded-md "
        >
          Return to Homepage
        </NavLink>
      </div>
    </div>
  );
};

export default ConfirmPage;

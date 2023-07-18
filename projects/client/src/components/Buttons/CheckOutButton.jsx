import React from "react";
import { useNavigate } from "react-router-dom";


const CheckoutButton = ({ disabled }) => {
  const navigate = useNavigate();
  return (
    <button
      className="btn btn-primary px-4 py-2 text-base-100"
      onClick={() => navigate("/create-order")}
      disabled={disabled ? true : false}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;

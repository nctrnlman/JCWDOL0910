import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/products/productSlice";

const AddToCartButton = ({ product, quantity }) => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(addCartItem(product, quantity));
  };

  const isUserLoggedIn = !!localStorage.getItem("user_token"); // Check if user_token exists in localStorage

  return (
    <button
      onClick={() => handleButtonClick(product)}
      disabled={!isUserLoggedIn}
      className="btn btn-secondary text-xs"
    >
      Add To Cart
    </button>
  );
};

export default AddToCartButton;

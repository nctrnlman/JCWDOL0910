import React from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/products/productSlice";

const AddToCartButton = ({ id_product, name, price }) => {
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    dispatch(
      addCartItem({
        id_product: id_product,
        name: name,
        price: price,
        quantity: 1,
      })
    );
  };

  const isUserLoggedIn = !!localStorage.getItem("user_token"); // Check if user_token exists in localStorage

  return (
    <button
      onClick={handleButtonClick}
      disabled={!isUserLoggedIn}
      className="btn btn-secondary text-xs"
    >
      Add To Cart
    </button>
  );
};

export default AddToCartButton;

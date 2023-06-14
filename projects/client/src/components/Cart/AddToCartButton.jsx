import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/carts/cartActions";

const AddToCartButton = ({ product, quantity }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.carts.cartItems);

  const handleButtonClick = () => {
    dispatch(addToCart(product.id_product, quantity, cartItems));
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

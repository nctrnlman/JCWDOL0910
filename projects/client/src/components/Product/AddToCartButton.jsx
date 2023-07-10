import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/carts/cartActions";

const AddToCartButton = ({ product, quantity }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.carts.cartItems);
  const [isStockAvailable, setIsStockAvailable] = useState(true);

  useEffect(() => {
    setIsStockAvailable(product.total_stock > 0);
  }, [product.total_stock]);

  const handleButtonClick = () => {
    if (isStockAvailable) {
      dispatch(addToCart(product.id_product, quantity, cartItems));
    }
  };

  const isUserLoggedIn = !!localStorage.getItem("user_token");

  return (
    <button
      onClick={handleButtonClick}
      disabled={!isUserLoggedIn || !isStockAvailable}
      className="btn btn-primary text-[8px] lg:text-xs"
    >
      {isStockAvailable ? "Add To Cart" : "Out of Stock"}
    </button>
  );
};

export default AddToCartButton;

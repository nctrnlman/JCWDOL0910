import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  updateCartItemQuantity,
} from "../../features/carts/cartSlice";

function CartItems({ item, onQuantityChange }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleIncrease = () => {
    dispatch(increaseCartItemQuantity(item.id_product));
    setQuantity(quantity + 1);
    onQuantityChange(item.price);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(decreaseCartItemQuantity(item.id_product));
      setQuantity(quantity - 1);
      onQuantityChange(-item.price);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({ id: item.id_product, quantity: newQuantity })
      );
      const priceDifference = (newQuantity - quantity) * item.price;
      setQuantity(newQuantity);
      onQuantityChange(priceDifference);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md mb-2">
      <div className="flex flex-row items-center gap-5">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-20 h-20 object-cover mr-2"
        />
        <div>
          <p className="text-sm uppercase lg:text-lg font-semibold">
            {item.name}
          </p>
          <p className="text-sm lg:text-lg text-gray-500">
            Price: {item.price}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded"
            onClick={handleDecrease}
            disabled={quantity === 1}
          >
            -
          </button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center"
          />
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <p className="text-sm lg:text-lg text-gray-500">
          Subtotal: {item.price * quantity}
        </p>
      </div>
    </div>
  );
}

export default CartItems;

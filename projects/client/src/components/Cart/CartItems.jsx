import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  deleteProductFromCart,
} from "../../features/carts/cartActions";
import { updateCartItemQuantity } from "../../features/carts/helpers/cartHelpers";
import { RiDeleteBin5Line } from "react-icons/ri";
import ConfirmationDialog from "./ConfirmationDialog";
import QuantityControl from "./QuantityControl";

function CartItems({ item }) {
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleIncrease = () => {
    dispatch(increaseCartItemQuantity(item.id_product));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(decreaseCartItemQuantity(item.id_product));
    } else {
      setShowConfirmation(true);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    dispatch(updateCartItemQuantity(item.id_product, newQuantity));
  };

  const handleDelete = () => {
    setShowConfirmation(false);
    dispatch(deleteProductFromCart(item.id_product));
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="bg-white p-4 shadow-md mb-2 relative">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-5">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-24 h-24 lg:w-36 lg:h-36 object-cover mr-2"
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
        <div className="flex flex-row">
          <button
            className="px-2 py-1 bg-error text-white rounded"
            onClick={() => setShowConfirmation(true)}
          >
            <RiDeleteBin5Line />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3">
        <QuantityControl
          quantity={item.quantity}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
          handleQuantityChange={handleQuantityChange}
        />
        <p className="text-sm lg:text-lg text-gray-500">
          Subtotal: {item.price * item.quantity}
        </p>
      </div>
      {showConfirmation && (
        <ConfirmationDialog
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default CartItems;

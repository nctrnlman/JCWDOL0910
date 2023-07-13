import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  deleteProductFromCart,
} from "../../features/carts/cartActions";
import { updateCartItemQuantity } from "../../features/carts/helpers/cartHelpers";
import DeleteModal from "../modals/DeleteModal";
import QuantityControl from "./QuantityControl";
import DeleteCartItemButton from "../Buttons/DeleteCartItemButton";
import CartItemsCard from "../Cards/CartItemsCard";

function CartItemsContent({ item }) {
  const dispatch = useDispatch();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemName, setDeleteItemName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleIncrease = () => {
    dispatch(increaseCartItemQuantity(item.id_product));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(decreaseCartItemQuantity(item.id_product));
    } else {
      setShowDeleteModal(true);
      setDeleteItemId(item.id_product);
      setDeleteItemName(item.name);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    dispatch(updateCartItemQuantity(item.id_product, newQuantity));
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    dispatch(deleteProductFromCart(deleteItemId));
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-base-100 p-4 shadow-xl mb-2 relative">
      <div className="flex flex-row justify-between items-center">
        <CartItemsCard item={item} />
        <div className="flex flex-row">
          <DeleteCartItemButton
            setShowDeleteModal={setShowDeleteModal}
            setDeleteItemName={setDeleteItemName}
            setDeleteItemId={setDeleteItemId}
            item={item}
          />
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
      {showDeleteModal && (
        <DeleteModal
          deleteItemName={deleteItemName}
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default CartItemsContent;

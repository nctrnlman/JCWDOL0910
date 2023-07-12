import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  deleteProductFromCart,
} from "../../features/carts/cartActions";
import { updateCartItemQuantity } from "../../features/carts/helpers/cartHelpers";
import { RiDeleteBin5Line } from "react-icons/ri";
import DeleteModal from "../../components/modals/DeleteModal";
import QuantityControl from "./QuantityControl";

function CartItems({ item }) {
  const dispatch = useDispatch();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemName, setDeleteItemName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleIncrease = () => {
    const { quantity, total_stock } = item;
    if (quantity >= total_stock) {
      alert("Cannot increase quantity beyond available stock.");
    }
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
    <div className="bg-white p-4 shadow-md mb-2 relative">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-5">
          <img
            src={`http://localhost:8000/${item.image_url}`}
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
          <a
            href="#delete_modal"
            className="px-2 py-1 bg-error text-white rounded"
            onClick={() => {
              setShowDeleteModal(true);
              setDeleteItemId(item.id_product);
              setDeleteItemName(item.name);
            }}
          >
            <RiDeleteBin5Line />
          </a>
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

export default CartItems;

import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

function DeleteCartItemButton({
  setShowDeleteModal,
  setDeleteItemId,
  setDeleteItemName,
  item,
}) {
  return (
    <>
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
    </>
  );
}

export default DeleteCartItemButton;

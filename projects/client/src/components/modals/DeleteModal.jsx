import React from "react";

const DeleteModal = ({ deleteItemName, closeDeleteModal, handleDelete }) => {
  return (
    <div className="modal" id="delete_modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4 text-warning font-semibold">
          Are you sure you want to delete this {deleteItemName}?
        </p>
        <div className="modal-action">
          <a
            href="#close"
            className="btn btn-error"
            onClick={() => {
              handleDelete();
              closeDeleteModal();
            }}
          >
            Yes
          </a>
          <a
            href="#close"
            className="btn btn-primary"
            onClick={() => {
              closeDeleteModal();
            }}
          >
            No
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

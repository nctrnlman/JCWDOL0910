import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProductCategories } from "../../features/categories/ProductCategoriesSlice";
import CustomToast from "../CustomToast/CustomToast";
import { toast } from "react-toastify";
import CustomToastOptions from "../CustomToast/CustomToastOptions";
import Axios from "axios";

function DeleteModalCategory({ categoryId, categoryName, disabled }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(categoryName);
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      let response = await Axios.delete(
        `http://localhost:8000/api/admins/categories/delete/${categoryId}`
      );

      toast(
        <CustomToast type="success" message={response.data.message} />,
        CustomToastOptions
      );

      dispatch(getAllProductCategories());
      handleToggleModal();
    } catch (error) {
      toast(
        <CustomToast type="error" message={error.response.data.message} />,
        CustomToastOptions
      );
    }
  };

  return (
    <>
      <label
        htmlFor="my_modal_6"
        className={`btn btn-error w-[60px] lg:w-[100px] text-[10px] lg:text-[15px] ${
          disabled ? "disabled" : ""
        }`}
        disabled={disabled}
        onClick={disabled ? null : handleToggleModal}
      >
        Delete
      </label>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4 text-warning font-semibold">
                Are you sure you want to delete this {name}?
              </p>
              <div className="modal-action">
                <button className="btn btn-error " onClick={handleToggleModal}>
                  No
                </button>
                <button className="btn btn-primary" onClick={handleSubmitAdd}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteModalCategory;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProductCategories } from "../../features/categories/ProductCategoriesSlice";
import CustomToast from "../CustomToast/CustomToast";
import { toast } from "react-toastify";
import CustomToastOptions from "../CustomToast/CustomToastOptions";
import Axios from "axios";

function CreateModalCategory({ disabled }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      let response = await Axios.post(
        "http://localhost:8000/api/admins/categories/add",
        {
          name,
        }
      );

      toast(
        <CustomToast type="success" message={response.data.message} />,
        CustomToastOptions
      );

      setName("");
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
        className={`btn btn-primary ${disabled ? "disabled" : ""}`}
        disabled={disabled}
        onClick={handleToggleModal}
      >
        Add Category
      </label>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add New Category</h3>
              <p className="py-4">Category Name</p>
              <input
                type="text"
                placeholder="Category Name"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="modal-action">
                <button className="btn btn-error" onClick={handleToggleModal}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSubmitAdd}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateModalCategory;

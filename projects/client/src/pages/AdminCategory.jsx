import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { getAllProductCategories } from "../features/categories/ProductCategoriesSlice";
import CustomToast from "../components/CustomToast/CustomToast";
import { toast } from "react-toastify";
import CustomToastOptions from "../components/CustomToast/CustomToastOptions";
import NavbarDashboard from "../components/Admins/Navbar/NavbarDashboard";

function AdminCategory() {
  const product_categories = useSelector(
    (state) => state.productCategories.productCategories
  );
  const dispatch = useDispatch();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState(null);

  const selectCategory = (categoryId, categoryName) => {
    setId(categoryId);
    setName(categoryName);
    setShowModalEdit(true);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      let response = await Axios.post(
        "http://localhost:8000/api/categories/add",
        { name }
      );

      toast(
        <CustomToast type="success" message={response.data.message} />,
        CustomToastOptions
      );

      setShowModalAdd(false);
      setName("");
      dispatch(getAllProductCategories());
    } catch (error) {
      toast(
        <CustomToast type="error" message="Failed to Add Product" />,
        CustomToastOptions
      );
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      let response = await Axios.patch(
        `http://localhost:8000/api/categories/update`,
        { name, id }
      );

      toast(
        <CustomToast type="success" message={response.data.message} />,
        CustomToastOptions
      );

      setShowModalEdit(false);
      setName("");
      setId(null);
      dispatch(getAllProductCategories());
    } catch (error) {
      toast(
        <CustomToast type="error" message="Failed to Edit Product" />,
        CustomToastOptions
      );
    }
  };

  const handleDeleteCategory = async () => {
    try {
      let response = await Axios.delete(
        `http://localhost:8000/api/categories/delete/${id}`
      );

      toast(
        <CustomToast type="success" message={response.data.message} />,
        CustomToastOptions
      );

      setShowModalDelete(false);
      setId(null);
      dispatch(getAllProductCategories());
    } catch (error) {
      toast(
        <CustomToast type="error" message="Failed to Delete Product" />,
        CustomToastOptions
      );
    }
  };

  const renderCategoryList = () => {
    return product_categories?.map((category, index) => {
      const currentCount = index + 1;
      return (
        <tr key={category.id_category}>
          <td>{currentCount}</td>
          <td>{category.name}</td>
          <td>
            <button
              className="btn btn-info btn-outline"
              onClick={() =>
                selectCategory(category.id_category, category.name)
              }
            >
              Edit
            </button>
          </td>
          <td>
            <button
              className="btn btn-error btn-outline"
              onClick={() => {
                setId(category.id_category);
                setShowModalDelete(true);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    dispatch(getAllProductCategories());
  }, []);

  return (
    <NavbarDashboard>
      <div className="overflow-x-auto w-full px-3 lg:w-3/4 m-auto">
        <h1 className="text-center p-4 font-bold uppercase">Categories List</h1>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModalAdd(true)}
          >
            Create Category
          </button>
          {showModalAdd && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="modal modal-open">
                <div className="modal-box">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => setShowModalAdd(false)}
                  >
                    ✕
                  </button>
                  <div className="card-body">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Category Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Category Name"
                        className="input input-bordered"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-control mt-6">
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmitAdd}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderCategoryList()}</tbody>
        </table>
        {showModalEdit && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal modal-open">
              <div className="modal-box">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => {
                    setShowModalEdit(false);
                    setId(null);
                    setName("");
                  }}
                >
                  ✕
                </button>
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Category ID</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Category ID"
                      className="input input-bordered"
                      value={id}
                      readOnly
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Category Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Category Name"
                      className="input input-bordered"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button
                      className="btn btn-primary"
                      onClick={handleSubmitEdit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showModalDelete && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal modal-open">
              <div className="modal-box">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => {
                    setShowModalDelete(false);
                    setId(null);
                  }}
                >
                  ✕
                </button>
                <div className="card-body">
                  <h3 className="text-lg font-semibold mb-4">
                    Are you sure you want to delete this category?
                  </h3>
                  <div className="form-control mt-6">
                    <button
                      className="btn btn-error"
                      onClick={handleDeleteCategory}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </NavbarDashboard>
  );
}

export default AdminCategory;

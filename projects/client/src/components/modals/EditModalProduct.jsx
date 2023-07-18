import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  editProduct,
  fetchAdminProducts,
} from "../../features/products/adminProductSlice";

const EditModalProduct = ({
  closeEditModal,
  editItemId,
  categories,
  products,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    const selectedProduct = products.find(
      (product) => product.id_product === editItemId
    );
    if (selectedProduct) {
      setName(selectedProduct.name);
      setPrice(selectedProduct.price);
      setWeight(selectedProduct.weight); // Add this line
      setCategory(selectedProduct.id_category);
      setDescription(selectedProduct.description);
      setImage(selectedProduct.image_url);
      setImagePreview(`http://localhost:8000${selectedProduct.image_url}`); // Set initial image preview
    }
  }, [editItemId, products]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id_product", editItemId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("weight", weight);
    formData.append("id_category", category);
    formData.append("description", description);
    formData.append("image_url", image);
    dispatch(editProduct(editItemId, formData));
    closeEditModal();
  };

  return (
    <div className="modal" id="edit_modal_product">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Products</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name:</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered"
              placeholder="Enter warehouse name"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price:</span>
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input input-bordered"
              placeholder="Enter product price"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Weight:</span>
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="input input-bordered"
              placeholder="Enter product weight"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category:</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered"
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id_category} value={category.id_category}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description:</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input input-bordered "
              placeholder="Enter product description"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image:</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              onChange={handleImageChange}
            />
            {imagePreview && ( // Display image preview if available
              <div className="w-40 h-40 mt-2 lg:w-60 lg:h-60">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={closeEditModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModalProduct;

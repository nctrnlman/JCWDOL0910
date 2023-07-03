import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewProduct } from "../../features/products/adminProductSlice";

const CreateModalProduct = ({ closeCreateModal, categories }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [weight, setWeight] = useState("");

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
    formData.append("name", name);
    formData.append("price", price);
    formData.append("weight", weight);
    formData.append("id_category", category);
    formData.append("description", description);
    formData.append("image_url", image);

    dispatch(addNewProduct(formData));
    closeCreateModal();
  };

  return (
    <div className="modal" id="create_modal_product">
      <div className="modal-box mr-3">
        <h3 className="font-bold text-lg">Add New Product</h3>
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
              placeholder="Enter product name"
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
              className="input input-bordered"
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
              required
            />
            {imagePreview && (
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
              Add Product
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={closeCreateModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModalProduct;

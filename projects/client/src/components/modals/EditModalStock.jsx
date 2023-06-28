import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStockData } from "../../features/stocks/stocksSlice";

const EditModalStock = ({ stockId, closeEditModal }) => {
  const dispatch = useDispatch();
  const stockProduct = useSelector((state) =>
    state.stockProducts.stockProduct.find(
      (product) => product.id_stock === stockId
    )
  );

  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState("incoming");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStockData(stockId, parseInt(quantity), status));
    closeEditModal();
  };

  return (
    <div className="modal" id="edit_modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Stock</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name:</span>
            </label>
            <input
              type="text"
              value={stockProduct.product_name}
              className="input input-bordered"
              disabled
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Warehouse Name:</span>
            </label>
            <input
              type="text"
              value={stockProduct.warehouse_name}
              className="input input-bordered"
              disabled
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Status:</span>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="incoming">Incoming Stock</option>
              <option value="outgoing">Outgoing Stock</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantity:</span>
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input input-bordered"
              placeholder="Enter quantity"
              required
              min="0"
            />
          </div>
          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={quantity === 0}
            >
              Update Stock
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

export default EditModalStock;

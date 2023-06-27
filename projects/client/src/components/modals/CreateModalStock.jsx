import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewStock, fetchStockData } from "../../features/stocks/stocksSlice";
import { fetchWarehouses } from "../../features/warehouses/warehouseSlice";
import { fetchAllAdminProducts } from "../../features/products/adminProductSlice";

const CreateModalStock = ({ closeCreateModal }) => {
  const dispatch = useDispatch();
  const [warehouseId, setWarehouseId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const products = useSelector((state) => state.adminProducts.products);
  const warehouses = useSelector((state) => state.warehouses.warehouse);
  const handleWarehouseChange = (e) => {
    const selectedWarehouseId = e.target.value;
    setWarehouseId(selectedWarehouseId);
    setProductId("");
  };

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    setProductId(selectedProductId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(warehouseId, "wID", productId, "pID");
    dispatch(addNewStock(warehouseId, productId, parseInt(quantity)));
    dispatch(fetchStockData());
    closeCreateModal();
  };

  useEffect(() => {
    dispatch(fetchAllAdminProducts());
    dispatch(fetchWarehouses());
  }, [dispatch]);

  return (
    <div className="modal" id="create_modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add New Stock</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Warehouse Name:</span>
            </label>
            <select
              value={warehouseId}
              onChange={handleWarehouseChange}
              className="select select-bordered"
              required
            >
              <option value="">Select warehouse</option>
              {warehouses.map((warehouse) => (
                <option
                  key={warehouse.id_warehouse}
                  value={warehouse.id_warehouse}
                >
                  {warehouse.name}
                </option>
              ))}
            </select>
          </div>
          {warehouseId && (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name:</span>
                </label>
                <select
                  value={productId}
                  onChange={handleProductChange}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product.id_product} value={product.id_product}>
                      {product.name}
                    </option>
                  ))}
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
            </>
          )}
          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!productId}
            >
              Add Stock
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

export default CreateModalStock;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { fetchStockMovement } from "../../../features/reportStockSlice";

function StockReport() {
  const dispatch = useDispatch();
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const stockMovement = useSelector(
    (state) => state.reportStock.stock.stockMovementHistory.result
  );

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const token = localStorage.admin_token;
        if (token) {
          let response = await axios.get(
            `http://localhost:8000/api/warehouses/`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setWarehouses(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWarehouses();
  }, []);

  useEffect(() => {
    dispatch(fetchStockMovement());
  }, [dispatch]);

  return (
    <div className="text-slate-900 min-h-screen flex-row bg-base-100 h-screen w-screen  px-20 lg:">
      <div className="form-control">
        <select
          value={selectedWarehouse}
          onChange={(e) => {
            setSelectedWarehouse(e.target.value);
            fetchStockMovement(e.target.value);
          }}
          className="select select-bordered"
          required
        >
          <option value="">Select warehouse</option>
          {warehouses.map((w) => (
            <option key={w.id_warehouse} value={w.id_warehouse}>
              {w.name}
            </option>
          ))}
        </select>
      </div>
      <h1 className="text-center p-4 font-bold uppercase">
        Stock Movement History Details
      </h1>

      <div class="overflow-y-hidden rounded-lg border">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th class="px-5 py-3">Months</th>
                <th class="px-5 py-3">Movement Description</th>
                <th class="px-5 py-3">Stock Movement Reference ID</th>
                <th class="px-5 py-3">Product</th>
                <th class="px-5 py-3">Warehouse</th>
                <th class="px-5 py-3">Quantity</th>
                <th class="px-5 py-3">Created At</th>
              </tr>
            </thead>
            <tbody class="text-gray-500">
              {stockMovement?.map((sm) => {
                return (
                  <tr>
                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p class="whitespace-no-wrap">{sm.months}</p>
                    </td>
                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p class="whitespace-no-wrap">
                        {sm.movement_description}
                      </p>
                    </td>
                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p class="whitespace-no-wrap">
                        {sm.stock_movement_reference_id}
                      </p>
                    </td>
                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p class="whitespace-no-wrap">{sm.id_product}</p>
                    </td>
                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p class="whitespace-no-wrap">{sm.id_warehouse}</p>
                    </td>
                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p class="whitespace-no-wrap">{sm.quantity}</p>
                    </td>
                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p class="whitespace-no-wrap">{sm.created_at}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StockReport;

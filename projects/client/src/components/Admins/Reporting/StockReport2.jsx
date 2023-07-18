import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  fetchStockMovementDetail,
  fetchStockMovementRecap,
} from "../../../features/reportStockSlice";
import { fetchAllWarehouseData } from "../../../features/warehouses/warehouseSlice";

function StockReport() {
  const stockMovementHistoryRecap = useSelector(
    (state) => state.reportStock.stock.stockMovementHistoryRecap.result
  );
  const stockMovementDetail = useSelector(
    (state) => state.reportStock.stock.stockMovementDetail.result
  );

  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const warehouses = useSelector((state) => state.warehouses.warehouse);
  const [stockMovementHistoryRecap2, setstockMovementHistoryRecap2] = useState(
    []
  );
  const [stockMovementDetail2, setstockMovementDetail2] = useState([]);

  const admin = useSelector((state) => state.admins.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockMovementDetail());
    dispatch(fetchStockMovementRecap());
    setstockMovementHistoryRecap2([null]);
    setstockMovementDetail2([null]);
  }, []);

  useEffect(() => {
    dispatch(fetchAllWarehouseData());
  }, []);

  const selectStockFromWarehouse = async () => {
    try {
      const token = localStorage.admin_token;
      if (selectedWarehouse) {
        if (token) {
          let responseRecap = await axios.get(
            `http://localhost:8000/api/admins/stock-movement-recap/${selectedWarehouse}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          let responseDetail = await axios.get(
            `http://localhost:8000/api/admins/stock-movement-detail/${selectedWarehouse}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setstockMovementHistoryRecap2(responseRecap.data.result);
          setstockMovementDetail2(responseDetail.data.result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    selectStockFromWarehouse();
  }, [selectedWarehouse]);

  return (
    <div className="text-slate-900 min-h-screen flex-row bg-base-100 h-screen w-screen  px-20 lg:">
      <p className="font-bold text-3xl px-8 pt-4 m-3"> Stock Movement Report</p>
      {admin.role === "Super Admin" && (
        <div className="form-control m-5">
          <select
            value={selectedWarehouse}
            onChange={(e) => {
              setSelectedWarehouse(e.target.value);
            }}
            className="select select-bordered"
            required
          >
            <option value="">Select warehouse</option>
            {warehouses?.map((w) => (
              <option key={w.id_warehouse} value={w.id_warehouse}>
                {w.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <p className="font-bold text-2xl px-8 pt-4 m-3">Stock Movement Recap</p>
      {stockMovementHistoryRecap2[0] == null ? (
        <div class="overflow-y-hidden rounded-lg border">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th class="px-5 py-3">Months</th>
                  <th class="px-5 py-3">Warehouse Name</th>
                  <th class="px-5 py-3">Product Name</th>
                  <th class="px-5 py-3">Stock Awal</th>
                  <th class="px-5 py-3">Total Penambahan</th>
                  <th class="px-5 py-3">Total Pengurangan</th>
                  <th class="px-5 py-3">Stock Akhir</th>
                </tr>
              </thead>
              <tbody class="text-gray-500">
                {stockMovementHistoryRecap?.map((dt) => {
                  return (
                    <tr>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.months}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.warehouse_name}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.product_name}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.stock_awal_bulan}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.total_penambahan}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.total_pengurangan}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.stock_akhir_bulan}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div class="overflow-y-hidden rounded-lg border">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th class="px-5 py-3">Bulan</th>
                  <th class="px-5 py-3">Warehouse Name</th>
                  <th class="px-5 py-3">Product Name</th>
                  <th class="px-5 py-3">Stock Awal</th>
                  <th class="px-5 py-3">Total Penambahan</th>
                  <th class="px-5 py-3">Total Pengurangan</th>
                  <th class="px-5 py-3">Stock Akhir</th>
                </tr>
              </thead>
              <tbody class="text-gray-500">
                {stockMovementHistoryRecap2?.map((dt) => {
                  return (
                    <tr>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.months}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.warehouse_name}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.product_name}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.stock_awal_bulan}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.total_penambahan}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.total_pengurangan}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.stock_akhir_bulan}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="font-bold text-2xl px-8 pt-4 m-3">Stock Movement Detail</p>

      {stockMovementDetail2[0] == null ? (
        <div class="overflow-y-hidden rounded-lg border">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th class="px-5 py-3">Warehouse Name</th>
                  <th class="px-5 py-3">Product Name</th>
                  <th class="px-5 py-3">Status</th>
                  <th class="px-5 py-3">Perubahan Stock Qty</th>
                  <th class="px-5 py-3">Waktu Perubahan Stock</th>
                </tr>
              </thead>
              <tbody class="text-gray-500">
                {stockMovementDetail?.map((dt) => {
                  return (
                    <tr>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.warehouse_name}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.product_name}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.status}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.stock_change}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.created_at}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div class="overflow-y-hidden rounded-lg border">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th class="px-5 py-3">Warehouse Name</th>
                  <th class="px-5 py-3">Product Name</th>
                  <th class="px-5 py-3">Status</th>
                  <th class="px-5 py-3">Perubahan Stock Qty</th>
                  <th class="px-5 py-3">Waktu Perubahan Stock</th>
                </tr>
              </thead>
              <tbody class="text-gray-500">
                {stockMovementDetail2?.map((dt) => {
                  return (
                    <tr>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.warehouse_name}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.product_name}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.status}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.stock_change}</p>
                      </td>
                      <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{dt.created_at}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockReport;

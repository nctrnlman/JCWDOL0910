import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
// import { Select } from "@chakra-ui/react";
import { parseISO } from "date-fns";
import { differenceInDays, add } from "date-fns";
import axios from "axios";
// import {
//     Table,
//     Thead,
//     Tbody,
//     Tr,
//     Th,
//     Td,
//     TableContainer,
//     Button,
//     Text,
// } from "@chakra-ui/react";
import {
  // fetchAllTransaction,
  fetchStockMovement,
} from "../../../features/reportStockSlice";
import Datepicker from "react-tailwindcss-datepicker";
// import "react-tailwindcss-datepicker/dist/index.css";
// import TransactionTable from "../components/TransactionTable";

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
      {/* <div>
                {stockMovement?.map((w) => {
                    return (
                        <p>{w.movement_description}</p>
                    )
                })}
            </div> */}

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
                {/* <th class="px-5 py-3">Status</th> */}
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

                    {/* <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                <span class="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">{user.is_verfied}</span>
                                            </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <div class="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                    <span class="text-xs text-gray-600 sm:text-sm"> Showing 1 to 5 of 12 Entries </span>
                    <div class="mt-2 inline-flex sm:mt-0">
                        <button class="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev</button>
                        <button class="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>
                    </div>
                </div> */}
      </div>
    </div>
  );
}

export default StockReport;

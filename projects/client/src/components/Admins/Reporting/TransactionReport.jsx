import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  fetchAllMonthlyTransaction,
  fetchAllMonthlyCatTransaction,
  fetchAllMonthlyProductTransaction,
} from "../../../features/reportTransactionSlice";
import { fetchAllWarehouseData } from "../../../features/warehouses/warehouseSlice";

function TransactionReport() {
  const dailyTransaction = useSelector(
    (state) => state.reportTransaction.transaction.dailyTransaction.result
  );
  const monthlyTransaction = useSelector(
    (state) => state.reportTransaction.transaction.monthlyTransaction.result
  );
  const monthlyCatTransaction = useSelector(
    (state) => state.reportTransaction.transaction.monthlyCatTransaction.result
  );
  const monthlyProductTransaction = useSelector(
    (state) =>
      state.reportTransaction.transaction.monthlyProductTransaction.result
  );
  const allMonthlyTransaction = useSelector(
    (state) => state.reportTransaction.transaction.allMonthlyTransactions.result
  );
  const allMonthlyCatTransaction = useSelector(
    (state) =>
      state.reportTransaction.transaction.allMonthlyCatTransactions.result
  );
  const allMonthlyProductTransaction = useSelector(
    (state) =>
      state.reportTransaction.transaction.allMonthlyProductTransactions.result
  );

  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const warehouses = useSelector((state) => state.warehouses.warehouse.data);
  const [allMonthlyTransactionfilt, setallMonthlyTransactionfilt] = useState(
    []
  );
  const [allMonthlyCatTransactionfilt, setallMonthlyCatTransactionfilt] =
    useState([]);
  const [
    allMonthlyProductTransactionfilt,
    setallMonthlyProductTransactionfilt,
  ] = useState([]);

  const admin = useSelector((state) => state.admins.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMonthlyTransaction());
    dispatch(fetchAllMonthlyCatTransaction());
    dispatch(fetchAllMonthlyProductTransaction());
    setallMonthlyTransactionfilt([null]);
    setallMonthlyCatTransactionfilt([null]);
    setallMonthlyProductTransactionfilt([null]);
  }, []);

  useEffect(() => {
    dispatch(fetchAllWarehouseData());
  }, []);

  const selectTransactionFromWarehouse = async () => {
    try {
      const token = localStorage.admin_token;
      if (selectedWarehouse) {
        if (token) {
          let responseMonthly = await axios.get(
            `http://localhost:8000/api/admins/all-transactions-monthly/${selectedWarehouse}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          let responseMonthlyCat = await axios.get(
            `http://localhost:8000/api/admins/all-transactions-category-monthly/${selectedWarehouse}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          let responseMonthlyProduct = await axios.get(
            `http://localhost:8000/api/admins/all-transactions-product-monthly/${selectedWarehouse}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setallMonthlyTransactionfilt(responseMonthly.data.result);
          setallMonthlyCatTransactionfilt(responseMonthlyCat.data.result);
          setallMonthlyProductTransactionfilt(
            responseMonthlyProduct.data.result
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    selectTransactionFromWarehouse();
  }, [selectedWarehouse]);

  return (
    <div className="text-slate-900 min-h-screen flex-row bg-base-100 h-screen w-screen  px-20 lg:">
      <p className="font-bold text-3xl px-8 pt-4 m-3"> Sales Report</p>
      <p className="font-bold text-lg px-8 pt-4 m-3">
        Note : Only orders with the status of "Pesanan Dikonfirmasi" are deemed
        eligible for inclusion in the Sales Report.
      </p>

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

      <p className="font-bold text-2xl px-8 pt-4 m-3">
        All Monthly Transaction
      </p>
      {allMonthlyTransactionfilt[0] == null ? (
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Months</th>
                  <th className="px-5 py-3">Warehouse Name</th>
                  <th className="px-5 py-3">Total Amount</th>
                  <th className="px-5 py-3">Total Orders</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {allMonthlyTransaction?.map((dt) => {
                  return (
                    <tr>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.months}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          {dt.warehouse_name}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.total_amount}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.total_orders}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Months</th>
                  <th className="px-5 py-3">Warehouse Name</th>
                  <th className="px-5 py-3">Total Amount</th>
                  <th className="px-5 py-3">Total Orders</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {allMonthlyTransactionfilt?.map((dt) => {
                  return (
                    <tr>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.months}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          {dt.warehouse_name}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.total_amount}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.total_orders}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="font-bold text-2xl px-8 pt-4 m-3">
        All Monthly Category Transaction
      </p>

      {allMonthlyCatTransactionfilt[0] == null ? (
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Months</th>
                  <th className="px-5 py-3">Warehouse Name</th>
                  <th className="px-5 py-3">Product Category</th>
                  <th className="px-5 py-3">Total Amount</th>
                  <th className="px-5 py-3">Total Orders</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {allMonthlyCatTransaction?.map((dt) => {
                  return (
                    <tr>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.months}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          {dt.warehouse_name}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          {dt.product_category}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.total_amount}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.total_orders}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Months</th>
                  <th className="px-5 py-3">Warehouse Name</th>
                  <th className="px-5 py-3">Product Category</th>
                  <th className="px-5 py-3">Total Amount</th>
                  <th className="px-5 py-3">Total Orders</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {allMonthlyCatTransactionfilt?.map((dt) => {
                  return (
                    <tr>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.months}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          {dt.warehouse_name}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          {dt.product_category}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.total_amount}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.total_orders}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="font-bold text-2xl px-8 pt-4 m-3">
        All Monthly Product Transaction
      </p>

      {allMonthlyProductTransactionfilt[0] == null ? (
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Months</th>
                  <th className="px-5 py-3">Warehouse Name</th>
                  <th className="px-5 py-3">Product Name</th>
                  <th className="px-5 py-3">Total Amount</th>
                  <th className="px-5 py-3">Total Orders</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {allMonthlyProductTransaction?.map((dt) => {
                  return (
                    <tr>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.months}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          {dt.warehouse_name}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.product_name}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.total_amount}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.total_orders}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Months</th>
                  <th className="px-5 py-3">Warehouse Name</th>
                  <th className="px-5 py-3">Product Name</th>
                  <th className="px-5 py-3">Total Amount</th>
                  <th className="px-5 py-3">Total Orders</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {allMonthlyProductTransactionfilt?.map((dt) => {
                  return (
                    <tr>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.months}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          {dt.warehouse_name}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.product_name}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.total_amount}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{dt.total_orders}</p>
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

export default TransactionReport;

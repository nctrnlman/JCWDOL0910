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
    fetchStockMovementDetail, fetchStockMovementRecap
} from "../../../features/reportStockSlice";
import Datepicker from "react-tailwindcss-datepicker";
// import "react-tailwindcss-datepicker/dist/index.css";
// import TransactionTable from "../components/TransactionTable";


function StockReport() {
    const stockMovementHistoryRecap = useSelector(
        (state) => state.reportStock.stock.stockMovementHistoryRecap.result
    );
    const stockMovementDetail = useSelector(
        (state) => state.reportStock.stock.stockMovementDetail.result
    );

    const [selectedWarehouse, setSelectedWarehouse] = useState("");
    const [warehouses, setWarehouses] = useState([]);
    const [stockMovementHistoryRecap2, setstockMovementHistoryRecap2] = useState([])
    const [stockMovementDetail2, setstockMovementDetail2] = useState([])

    const admin = useSelector(
        (state) => state.admins.admin
    );
    console.log(admin)

    // const [value, setValue] = useState({
    //     startDate: null,
    //     endDate: null,
    // });

    const dispatch = useDispatch();
    // const userGlobal = useSelector((state) => state.user.user);
    // // const { id } = userGlobal;
    // const { id } = useParams();

    // const handleValueChange = async (newValue) => {

    //     console.log("newValue:", newValue);
    //     const status = await dispatch(fetchTransactionOnDateRange(newValue));
    //     const status2 = await dispatch(fetchMonthlyTransactionOnDateRange(newValue));
    //     const status3 = await dispatch(fetchMonthlyCatTransactionOnDateRange(newValue));
    //     const status4 = await dispatch(fetchMonthlyProductTransactionOnDateRange(newValue));
    //     // dispatch(fetchAllTransaction(id));
    //     if (status === false) {
    //         const now = format(Date.now(), "yyyy-MM-dd");
    //         const sevenDaysAgo = format(add(Date.now(), { days: -7 }), "yyyy-MM-dd");
    //         // dispatch(fetchAllTransaction(id));
    //         let curval = { startDate: sevenDaysAgo, endDate: now };
    //         setValue({ ...value, ...curval });
    //     } else if (status === true) {
    //         // console.log(newValue);
    //         setValue(newValue);
    //     }
    // };
    // console.log(dailyTransaction)

    useEffect(() => {
        dispatch(fetchStockMovementDetail());
        dispatch(fetchStockMovementRecap());
        setstockMovementHistoryRecap2([null])
        setstockMovementDetail2([null])
    }, []);

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const token = localStorage.admin_token;
                console.log("token dari fetchwarehouse", token)
                if (token) {
                    console.log("token dari fetchwarehouse 2", token)
                    let response = await axios.get(
                        `http://localhost:8000/api/warehouses/`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    console.log(response.data)
                    setWarehouses(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchWarehouses();
    }, []);




    const selectStockFromWarehouse = async () => {
        try {
            const token = localStorage.admin_token;
            if (selectedWarehouse) {
                const token = localStorage.admin_token;
                console.log("selectStockFromWarehouse", token)
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

                    setstockMovementHistoryRecap2(responseRecap.data.result)
                    setstockMovementDetail2(responseDetail.data.result)
                    // console.log(responseMonthly.data)
                    // console.log(responseMonthlyCat.data)
                    // console.log(responseMonthlyProduct.data)
                    // dispatch(fetchAllMonthlyTransaction(responseMonthly.data));
                    // dispatch(fetchAllMonthlyCatTransaction(responseMonthlyCat.data));
                    // dispatch(fetchAllMonthlyProductTransaction(responseMonthlyProduct.data));
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        selectStockFromWarehouse();
    }, [selectedWarehouse]);

    console.log("selectedWarehouse", selectedWarehouse)
    console.log("stockMovementHistoryRecap2", stockMovementHistoryRecap2)
    console.log("stockMovementDetail2", stockMovementDetail2)

    // const findMaxTamount = (arr) => {
    //     let maxValue = 0;
    //     for (let i = 0; i < arr.length; i++) {
    //         if (parseInt(arr[i].total_amount) > maxValue) {
    //             maxValue = arr[i].total_amount;
    //         }
    //     }
    //     return maxValue;
    // };
    // if (allMonthlyTransaction) {
    //     console.log("findMaxTamount", findMaxTamount(allMonthlyTransaction))
    // }


    //----------------------------------------------------------------
    return (
        <div className="text-slate-900 min-h-screen flex-row bg-base-100 h-screen w-screen  px-20 lg:">
            {/* <div className="flex flex-row max-w-lg ml-6 mt-6">
                <Datepicker
                    wrapperClassName="relative"
                    inputClassName="w-full px-3 py-2 text-neutral-800 rounded-md border border-neutral-300 focus:outline-none focus:border-primary-400"
                    calendarWrapperClassName="absolute top-full left-0 mt-2 w-full bg-white rounded-md shadow-lg"
                    calendarHeaderClassName="flex items-center justify-between px-4 py-2 bg-primary-400 text-white rounded-t-md"
                    calendarNavButtonClassName="flex items-center justify-center w-6 h-6 text-white rounded-full bg-primary-500 hover:bg-primary-600 focus:outline-none"
                    calendarNavIconClassName="w-4 h-4"
                    calendarTitleClassName="font-medium"
                    calendarWeekdayClassName="flex items-center justify-center w-8 h-8 text-neutral-700"
                    calendarDayClassName="flex items-center justify-center w-8 h-8 text-neutral-800 rounded-full hover:bg-primary-400 focus:bg-primary-400"
                    calendarDayDisabledClassName="text-neutral-400 cursor-not-allowed"
                    shortcutsWrapperClassName="mt-2"
                    shortcutClassName="inline-flex items-center justify-center px-3 py-1 text-xs font-medium text-neutral-800 bg-neutral-300 rounded-md cursor-pointer hover:bg-neutral-400 focus:outline-none focus:bg-neutral-400"
                    selectedShortcutsClassName="bg-primary-400"
                    primaryColor="rose"
                    value={value}
                    onChange={handleValueChange}
                    showShortcuts={true}
                />
            </div> */}

            <p className="font-bold text-3xl px-8 pt-4 m-3"> Stock Movement Report</p>

            {admin.role === "Super Admin" && (
                <div className="form-control m-5">
                    <select
                        value={selectedWarehouse}
                        onChange={(e) => { setSelectedWarehouse(e.target.value) }}
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
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                < div class="overflow-y-hidden rounded-lg border">
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
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


            <p className="font-bold text-2xl px-8 pt-4 m-3">Stock Movement Detail</p>

            {stockMovementDetail2[0] == null ? (<div class="overflow-y-hidden rounded-lg border">
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
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>) : (<div class="overflow-y-hidden rounded-lg border">
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
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>)}

        </div >
    );
}

export default StockReport;
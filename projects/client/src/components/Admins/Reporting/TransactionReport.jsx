import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
// import { Select } from "@chakra-ui/react";
import { parseISO } from "date-fns";
import { differenceInDays, add } from "date-fns";
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
    fetchTransactionOnDateRange, fetchMonthlyTransactionOnDateRange, fetchMonthlyCatTransactionOnDateRange, fetchMonthlyProductTransactionOnDateRange
} from "../../../features/reportTransactionSlice";
import Datepicker from "react-tailwindcss-datepicker";
// import "react-tailwindcss-datepicker/dist/index.css";
// import TransactionTable from "../components/TransactionTable";


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
        (state) => state.reportTransaction.transaction.monthlyProductTransaction.result
    );

    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
    });

    const dispatch = useDispatch();
    // const userGlobal = useSelector((state) => state.user.user);
    // // const { id } = userGlobal;
    // const { id } = useParams();

    const handleValueChange = async (newValue) => {

        console.log("newValue:", newValue);
        const status = await dispatch(fetchTransactionOnDateRange(newValue));
        const status2 = await dispatch(fetchMonthlyTransactionOnDateRange(newValue));
        const status3 = await dispatch(fetchMonthlyCatTransactionOnDateRange(newValue));
        const status4 = await dispatch(fetchMonthlyProductTransactionOnDateRange(newValue));
        // dispatch(fetchAllTransaction(id));
        if (status === false) {
            const now = format(Date.now(), "yyyy-MM-dd");
            const sevenDaysAgo = format(add(Date.now(), { days: -7 }), "yyyy-MM-dd");
            // dispatch(fetchAllTransaction(id));
            let curval = { startDate: sevenDaysAgo, endDate: now };
            setValue({ ...value, ...curval });
        } else if (status === true) {
            // console.log(newValue);
            setValue(newValue);
        }
    };


    // useEffect(() => {
    //     setIsTopProduct(true);
    //     dispatch(fetchAllTransaction(id));
    // }, []);

    //----------------------------------------------------------------
    return (
        <div className="text-slate-900 min-h-screen flex-row bg-base-100 h-screen w-screen  px-20 lg:">

            <div className="flex flex-row max-w-lg ml-6 mt-6">
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
            </div>


            <p className="font-bold text-2xl px-8 pt-4">Monthly Transaction</p>
            <div class="overflow-y-hidden rounded-lg border">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                <th class="px-5 py-3">Months</th>
                                <th class="px-5 py-3">Total Amount</th>
                                <th class="px-5 py-3">Total Orders</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-500">
                            {monthlyTransaction?.map((dt) => {
                                return (
                                    <tr>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.months}</p>
                                        </td>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.total_amount}</p>
                                        </td>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.total_orders}</p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>


            <p className="font-bold text-2xl px-8 pt-4">Monthly Transaction based on Product Category</p>
            <div class="overflow-y-hidden rounded-lg border">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                <th class="px-5 py-3">Months</th>
                                <th class="px-5 py-3">Product Category</th>
                                <th class="px-5 py-3">Total Amount</th>
                                <th class="px-5 py-3">Total Orders</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-500">
                            {monthlyCatTransaction?.map((dt) => {
                                return (
                                    <tr>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.months}</p>
                                        </td>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.product_category}</p>
                                        </td>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.total_amount}</p>
                                        </td>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.total_orders}</p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>


            <p className="font-bold text-2xl px-8 pt-4">Monthly Transaction based on Product</p>
            <div class="overflow-y-hidden rounded-lg border">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                <th class="px-5 py-3">Months</th>
                                <th class="px-5 py-3">Product Name</th>
                                <th class="px-5 py-3">Total Amount</th>
                                <th class="px-5 py-3">Total Orders</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-500">
                            {monthlyProductTransaction?.map((dt) => {
                                return (
                                    <tr>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.months}</p>
                                        </td>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.product_name}</p>
                                        </td>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.total_amount}</p>
                                        </td>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.total_orders}</p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="font-bold text-2xl px-8 pt-4">Daily Transaction</p>
            <div class="overflow-y-hidden rounded-lg border">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class=" bg-slate-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                <th class="px-5 py-3">Dates</th>
                                <th class="px-5 py-3">Total Amount</th>
                                <th class="px-5 py-3">Total Orders</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-500">
                            {dailyTransaction?.map((dt) => {
                                return (
                                    <tr>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.date}</p>
                                        </td>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.total_amount}</p>
                                        </td>
                                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p class="whitespace-no-wrap">{dt.total_orders}</p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default TransactionReport;
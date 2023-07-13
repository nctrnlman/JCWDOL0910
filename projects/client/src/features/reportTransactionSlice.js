import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const reportTransactionSlice = createSlice({
    name: "reportTransaction",
    initialState: {
        transaction: {
            dailyTransaction: [],
            monthlyTransaction: [],
            monthlyCatTransaction: [],
            monthlyProductTransaction: []
        },
        //   topProduct: [],
        //   filteredProduct: [],
        //   categoryProduct: [],
        //   grossIncome: 0,
    },
    reducers: {
        setDailyTransaction: (state, action) => {
            state.transaction.dailyTransaction = action.payload;
        },
        setMonthlyTransaction: (state, action) => {
            state.transaction.monthlyTransaction = action.payload;
        },
        setMonthlyCatTransaction: (state, action) => {
            state.transaction.monthlyCatTransaction = action.payload;
        },
        setMonthlyProductTransaction: (state, action) => {
            state.transaction.monthlyProductTransaction = action.payload;
        },
    }
});

export const { setDailyTransaction, setMonthlyTransaction, setMonthlyCatTransaction, setMonthlyProductTransaction } = reportTransactionSlice.actions;

export default reportTransactionSlice.reducer;

export const fetchTransactionOnDateRange = (dateRange) => {
    console.log(dateRange)
    return async (dispatch) => {
        // console.log(localStorage.user_token)
        try {
            const token = localStorage.admin_token;
            console.log("token dari fetchTransactionOnDateRange", token)
            if (token) {
                console.log("token dari fetchTransactionOnDateRange 2", token)
                console.log("dateRange dari fetchTransactionOnDateRange", dateRange)
                let response = await Axios.post(
                    `http://localhost:8000/api/admins/transaction-on-range`,
                    { dateRange },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                dispatch(setDailyTransaction(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const fetchMonthlyTransactionOnDateRange = (dateRange) => {
    console.log(dateRange)
    return async (dispatch) => {
        // console.log(localStorage.user_token)
        try {
            const token = localStorage.admin_token;
            console.log("token dari fetchmonthlyTransactionOnDateRange", token)
            if (token) {
                console.log("token dari fetchmonthlyTransactionOnDateRange 2", token)
                console.log("dateRange dari fetchmonthlyTransactionOnDateRange", dateRange)
                let response = await Axios.post(
                    `http://localhost:8000/api/admins/transaction-monthly`,
                    { dateRange },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                dispatch(setMonthlyTransaction(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const fetchMonthlyCatTransactionOnDateRange = (dateRange) => {
    console.log(dateRange)
    return async (dispatch) => {
        // console.log(localStorage.user_token)
        try {
            const token = localStorage.admin_token;
            console.log("token dari fetchmonthlycatTransactionOnDateRange", token)
            if (token) {
                console.log("token dari fetchmonthlycatTransactionOnDateRange 2", token)
                console.log("dateRange dari fetchmonthlycatTransactionOnDateRange", dateRange)
                let response = await Axios.post(
                    `http://localhost:8000/api/admins/transaction-monthly-cat`,
                    { dateRange },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                dispatch(setMonthlyCatTransaction(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    };
};


export const fetchMonthlyProductTransactionOnDateRange = (dateRange) => {
    console.log(dateRange)
    return async (dispatch) => {
        // console.log(localStorage.user_token)
        try {
            const token = localStorage.admin_token;
            console.log("token dari fetchmonthlyproductTransactionOnDateRange", token)
            if (token) {
                console.log("token dari fetchmonthlyproductTransactionOnDateRange 2", token)
                console.log("dateRange dari fetchmonthlyproductTransactionOnDateRange", dateRange)
                let response = await Axios.post(
                    `http://localhost:8000/api/admins/transaction-monthly-product`,
                    { dateRange },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                dispatch(setMonthlyProductTransaction(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    };
};


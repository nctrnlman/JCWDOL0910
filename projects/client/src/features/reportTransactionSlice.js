import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const reportTransactionSlice = createSlice({
  name: "reportTransaction",
  initialState: {
    transaction: {
      allMonthlyTransactions: [],
      allMonthlyCatTransactions: [],
      allMonthlyProductTransactions: [],
      dailyTransaction: [],
      monthlyTransaction: [],
      monthlyCatTransaction: [],
      monthlyProductTransaction: [],
    },
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
    setAllMonthlyTransactions: (state, action) => {
      state.transaction.allMonthlyTransactions = action.payload;
    },
    setAllMonthlyCatTransactions: (state, action) => {
      state.transaction.allMonthlyCatTransactions = action.payload;
    },
    setAllMonthlyProductTransactions: (state, action) => {
      state.transaction.allMonthlyProductTransactions = action.payload;
    },
  },
});

export const {
  setDailyTransaction,
  setMonthlyTransaction,
  setMonthlyCatTransaction,
  setMonthlyProductTransaction,
  setAllMonthlyTransactions,
  setAllMonthlyCatTransactions,
  setAllMonthlyProductTransactions,
} = reportTransactionSlice.actions;

export default reportTransactionSlice.reducer;

export const fetchTransactionOnDateRange = (dateRange) => {
  return async (dispatch) => {
    try {
      const token = localStorage.admin_token;
      if (token) {
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
  return async (dispatch) => {
    try {
      const token = localStorage.admin_token;
      if (token) {
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
  return async (dispatch) => {
    try {
      const token = localStorage.admin_token;
      if (token) {
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
  return async (dispatch) => {
    try {
      const token = localStorage.admin_token;
      if (token) {
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

export const fetchAllMonthlyTransaction = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.admin_token;
      if (token) {
        let response = await Axios.get(
          `http://localhost:8000/api/admins/all-transactions-monthly`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setAllMonthlyTransactions(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchAllMonthlyCatTransaction = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.admin_token;
      if (token) {
        let response = await Axios.get(
          `http://localhost:8000/api/admins/all-transactions-category-monthly`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setAllMonthlyCatTransactions(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchAllMonthlyProductTransaction = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.admin_token;
      if (token) {
        let response = await Axios.get(
          `http://localhost:8000/api/admins/all-transactions-product-monthly`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setAllMonthlyProductTransactions(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

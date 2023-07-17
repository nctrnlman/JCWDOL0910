import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const reportStockSlice = createSlice({
  name: "reportStock",
  initialState: {
    stock: {
      stockMovementHistoryRecap: [],
      stockMovementDetail: [],
    },
    //   topProduct: [],
    //   filteredProduct: [],
    //   categoryProduct: [],
    //   grossIncome: 0,
  },
  reducers: {
    setStockMovHisRecap: (state, action) => {
      state.stock.stockMovementHistoryRecap = action.payload;
    },
    setStockMovementDetail: (state, action) => {
      state.stock.stockMovementDetail = action.payload;
    },
  },
});

export const { setStockMovHisRecap, setStockMovementDetail } =
  reportStockSlice.actions;

export default reportStockSlice.reducer;

export function fetchStockMovementRecap() {
  return async (dispatch) => {
    const token = localStorage.admin_token;

    try {
      const response = await Axios.get(
        `http://localhost:8000/api/admins/stock-movement-recap`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setStockMovHisRecap(response.data));
      // }
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchStockMovementDetail() {
  return async (dispatch) => {
    const token = localStorage.admin_token;

    try {
      const response = await Axios.get(
        `http://localhost:8000/api/admins/stock-movement-detail`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setStockMovementDetail(response.data));
      // }
    } catch (error) {
      console.log(error);
    }
  };
}

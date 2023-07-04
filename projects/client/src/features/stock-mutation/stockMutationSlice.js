import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const stockMutationSlice = createSlice({
  name: "stockMutation",
  initialState: {
    stockMutation: [],
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 0,
    sort: "",
  },
  reducers: {
    setStockMutation: (state, action) => {
      state.stockMutation = action.payload;
      state.message = action.payload.message;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const {
  setStockMutation,
  setCurrentPage,
  setTotalPages,
  setItemsPerPage,
  setSort,
} = stockMutationSlice.actions;

export default stockMutationSlice.reducer;

export function fetchStockMutation(page = 1, search = "", sort = "") {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admins/stock-mutation/?page=${page}&search=${search}&sort=${sort}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      const { stockMutation, totalPages, itemsPerPage } = response.data;

      dispatch(setStockMutation(stockMutation));
      dispatch(setCurrentPage(page));
      dispatch(setTotalPages(totalPages));
      dispatch(setItemsPerPage(itemsPerPage));
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };
}

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const stockSlice = createSlice({
  name: "stocks products",
  initialState: {
    stockProduct: [],
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 0,
    sort: "",
  },
  reducers: {
    setStock: (state, action) => {
      state.stockProduct = action.payload;
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
    addStock: (state, action) => {
      state.stockProduct.push(action.payload);
    },
  },
});

export const {
  setStock,
  setCurrentPage,
  setTotalPages,
  setItemsPerPage,
  setSort,
  addStock,
} = stockSlice.actions;

export default stockSlice.reducer;

export function fetchStockData(page = 1, search = "", sort = "") {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/stocks/?page=${page}&search=${search}&sort=${sort}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      const { stocks, totalPages, itemsPerPage } = response.data;

      dispatch(setStock(stocks));
      dispatch(setCurrentPage(page));
      dispatch(setTotalPages(totalPages));
      dispatch(setItemsPerPage(itemsPerPage));
      console.log(response.data, "fetchstock");
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };
}

export function addNewStock(idWarehouse, idProduct, quantity) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/stocks",
        {
          id_warehouse: idWarehouse,
          id_product: idProduct,
          quantity: quantity,
        },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      // Assuming the response contains the newly created stock object
      const newStock = response.data;

      dispatch(addStock(newStock));
      console.log(response.data, "addStock");
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };
}

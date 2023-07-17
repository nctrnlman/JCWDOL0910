import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../components/CustomToast/CustomNotification";

export const stockSlice = createSlice({
  name: "stocks",
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
    updateStock: (state, action) => {
      const updatedStock = action.payload;
      const index = state.stockProduct.findIndex(
        (stock) => stock.id_stock === updatedStock.id_stock
      );
      if (index !== -1) {
        state.stockProduct[index] = updatedStock;
      }
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
  updateStock,
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
    } catch (error) {
      console.log("Error fetching stocks:", error.response);
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
      const newStock = response.data;

      dispatch(addStock(newStock));
      showSuccessToast(response.data.message);
    } catch (error) {
      console.log("Error adding stock:", error.response);
      showErrorToast(error.response.data.message);
    }
  };
}

export function updateStockData(stockId, quantity, status) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await axios.put(
        `http://localhost:8000/api/stocks/`,
        {
          id_stock: stockId,
          quantity: quantity,
          status: status,
        },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      const updatedStock = response.data;

      dispatch(updateStock(updatedStock));
      dispatch(fetchStockData());
      showSuccessToast(response.data.message);
    } catch (error) {
      console.log(error.response);
      showErrorToast(error.response.data.message);
    }
  };
}

export function deleteStockData(id_stock) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/stocks?id_stock=${id_stock}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      dispatch(fetchStockData());
      showInfoToast(response.data.message);
    } catch (error) {
      console.log(error.response);
      showErrorToast(error.response.data.message);
    }
  };
}

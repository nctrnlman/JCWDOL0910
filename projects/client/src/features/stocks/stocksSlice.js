import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      console.error("Error fetching stocks:", error);
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
    } catch (error) {
      console.error("Error adding stock:", error);
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
    } catch (error) {
      console.error("Error editing stock:", error);
      console.log(error.response);
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
      console.log(response, "response delete");
      console.log(id_stock, "slice");
    } catch (error) {
      console.error("Error deleting warehouse:", error);
      console.log(error.response);
    }
  };
}

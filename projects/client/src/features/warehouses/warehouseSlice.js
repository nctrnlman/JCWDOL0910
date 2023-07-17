import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../components/CustomToast/CustomNotification";

export const warehouseSlice = createSlice({
  name: "warehouses",
  initialState: {
    warehouse: [],
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 0,
    isLoading: false,
  },
  reducers: {
    setWarehouse: (state, action) => {
      state.warehouse = action.payload;
      state.message = action.payload.message;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateWarehouse: (state, action) => {
      const { id_warehouse, updatedWarehouse } = action.payload;
      const warehouseIndex = state.warehouse.findIndex(
        (item) => item.id_warehouse === id_warehouse
      );
      if (warehouseIndex !== -1) {
        state.warehouse[warehouseIndex] = updatedWarehouse;
      }
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
  },
});
export const {
  setWarehouse,
  updateWarehouse,
  removeWarehouse,
  setIsLoading,
  setCurrentPage,
  setTotalPages,
  setItemsPerPage,
} = warehouseSlice.actions;

export default warehouseSlice.reducer;

export function fetchWarehouses(page = 1, search = "", sort = "") {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/warehouses?page=${page}&search=${search}&sort=${sort}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      const { warehouses, totalPages, itemsPerPage } = response.data;

      dispatch(setWarehouse(warehouses));
      dispatch(setCurrentPage(page));
      dispatch(setTotalPages(totalPages));
      dispatch(setItemsPerPage(itemsPerPage));
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };
}

export function fetchAllWarehouseData() {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await axios.get(
        "http://localhost:8000/api/warehouses/data",
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      dispatch(setWarehouse(response.data.data));
    } catch (error) {
      // showErrorToast(error.response.data.message);
      console.log(error);
    }
  };
}

export function deleteWarehouse(id_warehouse) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/warehouses/${id_warehouse}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      dispatch(fetchWarehouses());
      showInfoToast(response.data.message);
    } catch (error) {
      console.error("Error deleting warehouse:", error);
      showErrorToast(error.response.data.message);
    }
  };
}

export function editWarehouse(id_warehouse, updatedWarehouse) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      let response = await axios.put(
        `http://localhost:8000/api/warehouses/${id_warehouse}`,
        updatedWarehouse,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      dispatch(updateWarehouse({ id_warehouse, updatedWarehouse }));
      showInfoToast(response.data.message);
    } catch (error) {
      console.error("Error editing warehouse:", error);
      console.log(error);
      showErrorToast(error.response.data.message);
    }
  };
}

export function createWarehouse(warehouseData) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/warehouses",
        warehouseData,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      dispatch(fetchWarehouses());
      showSuccessToast(response.data.message);
    } catch (error) {
      showErrorToast(error.response.data.message);
      // console.error("Error creating warehouse:", error);
      console.log(error);
    }
  };
}

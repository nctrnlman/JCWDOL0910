import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast/CustomToast";
import CustomToastOptions from "../../components/CustomToast/CustomToastOptions";

export const warehouseSlice = createSlice({
  name: "warehouses",
  initialState: {
    warehouse: [],
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
  },
});
export const { setWarehouse, updateWarehouse, removeWarehouse, setIsLoading } =
  warehouseSlice.actions;

export default warehouseSlice.reducer;

export function fetchWarehouses() {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await axios.get("http://localhost:8000/api/warehouses", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      dispatch(setWarehouse(response.data));
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };
}

export function deleteWarehouse(id_warehouse) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      await axios.delete(
        `http://localhost:8000/api/warehouses/${id_warehouse}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      dispatch(fetchWarehouses());
    } catch (error) {
      console.error("Error deleting warehouse:", error);
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
      console.log(response.data.message);
      toast(
        <CustomToast type="success" message={response.data.message} />,
        CustomToastOptions
      );
    } catch (error) {
      console.error("Error editing warehouse:", error);
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
      console.log(response.data.message);
      dispatch(fetchWarehouses());
      toast(
        <CustomToast type="success" message={response.data.message} />,
        CustomToastOptions
      );
    } catch (error) {
      console.error("Error creating warehouse:", error);
    }
  };
}

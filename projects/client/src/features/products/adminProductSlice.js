import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const adminProductSlice = createSlice({
  name: "admin-products",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = adminProductSlice.actions;

export default adminProductSlice.reducer;
export function fetchAdminProducts() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/admins/products/"
      );
      dispatch(setProducts(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteProducts(id_product) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      await axios.delete(
        `http://localhost:8000/admins/products/${id_product}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      dispatch(fetchAdminProducts());
    } catch (error) {
      console.error("Error deleting warehouse:", error);
    }
  };
}

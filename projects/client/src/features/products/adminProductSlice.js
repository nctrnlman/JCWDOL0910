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
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
  },
});

export const { setProducts, updateProduct } = adminProductSlice.actions;

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

export function editProduct(id, productData) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await axios.put(
        `http://localhost:8000/admins/products/${id}`,
        productData,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      dispatch(updateProduct(response.data));
      console.log(response);
      // dispatch(fetchAdminProducts());
    } catch (error) {
      console.error("Error editing product:", error);
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

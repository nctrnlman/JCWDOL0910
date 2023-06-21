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
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { setProducts, updateProduct, addProduct } =
  adminProductSlice.actions;

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
    console.log(productData, "productdata");
    try {
      const response = await axios.put(
        `http://localhost:8000/admins/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            ContentType: "multipart/form-data",
          },
        }
      );
      dispatch(updateProduct(response.data));
      console.log(response);
      dispatch(fetchAdminProducts());
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { data } = error.response;
        if (typeof data === "string") {
          // Handle general error message
          console.error("Error editing product:", data);
        } else if (typeof data === "object" && data.error) {
          // Handle specific error messages
          if (data.error === "Invalid file extension") {
            // Display error message for invalid file extension
            console.error("Invalid file extension");
          } else if (data.error === "File size exceeds the limit") {
            // Display error message for file size limit exceeded
            console.error("File size exceeds the limit");
          }
        }
      } else {
        console.error("Error editing product:", error);
      }
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
export function addNewProduct(productData) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await axios.post(
        "http://localhost:8000/admins/products/",
        productData,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      dispatch(addProduct(response.data));
      console.log(response);
    } catch (error) {
      console.error("Error adding new product:", error);
      console.log(error, "test");
    }
  };
}

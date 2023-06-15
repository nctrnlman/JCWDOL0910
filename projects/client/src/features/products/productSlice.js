import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    latest_products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLatestProducts: (state, action) => {
      state.latest_products = action.payload;
    },
  },
});

export const { setProducts, setLatestProducts } = productSlice.actions;

export default productSlice.reducer;

export function fetchProducts() {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:8000/products/");
      dispatch(setProducts(response.data));
      console.log(response, "productSlice");
    } catch (error) {
      console.error(error);
    }
  };
}

export function getLatestProducts() {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        "http://localhost:8000/products/latest_products"
      );
      console.log("latest_products");
      console.log(response.data, "latest products");
      dispatch(setLatestProducts(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

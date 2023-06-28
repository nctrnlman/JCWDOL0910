import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    latest_products: [],
    productCategory: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLatestProducts: (state, action) => {
      state.latest_products = action.payload;
    },
    setProductCategory: (state, action) => {
      state.productCategory = action.payload;
    },
  },
});

export const { setProducts, setLatestProducts, setProductCategory } =
  productSlice.actions;

export default productSlice.reducer;

export function fetchProducts(offset, limit, sort, filter) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/products/all-product",
        {
          params: {
            offset: offset || 0,
            limit: limit || 10,
            sort: sort,
            filter: filter,
          },
        }
      );
      dispatch(setProducts(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getLatestProducts() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/products/latest_products"
      );
      dispatch(setLatestProducts(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProductById(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products/product-detail/${id}`
      );
      dispatch(setProducts(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProductByCategory(category, offset, limit, sort, filter) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products/category`,
        {
          params: {
            offset: offset || 0,
            limit: limit || 10,
            sort: sort,
            filter: filter,
            category: category,
          },
        }
      );
      dispatch(setProductCategory(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

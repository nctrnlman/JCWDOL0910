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
    let response = await axios.get(
      "http://localhost:8000/products/all-product",
      {
        params: {
          offset: offset,
          limit: limit,
          sort: sort,
          filter: filter,
        },
      }
    );
    dispatch(setProducts(response.data));
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

export function getProductById(id) {
  return async (dispatch) => {
    let response = await axios.get(
      `http://localhost:8000/products/product-detail/${id}`
    );
    console.log(response.data);
    dispatch(setProducts(response.data));
  };
}

export function getProductByCategory(category, offset, limit, sort, filter) {
  return async (dispatch) => {
    let response = await axios.get(`http://localhost:8000/products/category`, {
      params: {
        offset: offset,
        limit: limit,
        sort: sort,
        filter: filter,
        category: category,
      },
    });
    console.log(response.data);
    dispatch(setProductCategory(response.data));
  };
}

import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    product: [],
    productCategory: [],
  },
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setProductCategory: (state, action) => {
      state.productCategory = action.payload;
    },
  },
});
export const { setProductList, setProduct, setProductCategory } =
  productSlice.actions;

export default productSlice.reducer;

export function fetchProducts(offset, limit, sort, filter) {
  return async (dispatch) => {
    let response = await Axios.get(
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
    dispatch(setProductList(response.data));
  };
}

export function getProductById(id) {
  return async (dispatch) => {
    let response = await Axios.get(
      `http://localhost:8000/products/product-detail/${id}`
    );
    console.log(response.data);
    dispatch(setProduct(response.data));
  };
}

export function getProductByCategory(category, offset, limit, sort, filter) {
  return async (dispatch) => {
    let response = await Axios.get(`http://localhost:8000/products/category`, {
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

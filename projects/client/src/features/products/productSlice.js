import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 0,
    sort: "",
    latest_products: [],
    productCategory: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
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
    setLatestProducts: (state, action) => {
      state.latest_products = action.payload;
    },
    setProductCategory: (state, action) => {
      state.productCategory = action.payload;
    },
  },
});

export const {
  setProducts,
  setLatestProducts,
  setProductCategory,
  setCurrentPage,
  setTotalPages,
  setItemsPerPage,
  setSort,
} = productSlice.actions;

export default productSlice.reducer;

export function fetchProducts(page = 1, search = "", sort = "", category = "") {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products/?page=${page}&search=${search}&sort=${sort}&category=${category}`
      );
      const { products, totalPages, itemsPerPage } = response.data;

      dispatch(setProducts(products));
      dispatch(setCurrentPage(page));
      dispatch(setTotalPages(totalPages));
      dispatch(setItemsPerPage(itemsPerPage));
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

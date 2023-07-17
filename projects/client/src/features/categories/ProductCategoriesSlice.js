import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const productCatSLice = createSlice({
  name: "productCategories",
  initialState: {
    productCategories: [],
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 0,
    sort: "",
  },
  reducers: {
    setProductCategories: (state, action) => {
      state.productCategories = action.payload;
      state.message = action.payload.message;
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
  },
});

export const {
  setProductCategories,
  setCurrentPage,
  setTotalPages,
  setItemsPerPage,
  setSort,
} = productCatSLice.actions;

export default productCatSLice.reducer;
export function getAllProductCategories(page = 1, search = "", sort = "") {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");
    try {
      const response = await Axios.get(
        `http://localhost:8000/api/admins/categories/?page=${page}&search=${search}&sort=${sort}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      const { productCategories, totalPages, itemsPerPage } = response.data;

      dispatch(setProductCategories(productCategories));
      dispatch(setCurrentPage(page));
      dispatch(setTotalPages(totalPages));
      dispatch(setItemsPerPage(itemsPerPage));
    } catch (error) {
      console.log(error);
    }
  };
}

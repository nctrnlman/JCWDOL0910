import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const orderListAdminSlice = createSlice({
  name: "orderListAdmin",
  initialState: {
    orders: [],
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 0,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
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
  },
});

export const { setOrders, setCurrentPage, setTotalPages, setItemsPerPage } =
  orderListAdminSlice.actions;
export default orderListAdminSlice.reducer;

export function fetchOrderPaymentList(
  page = 1,
  sort = "",
  search = "",
  status = ""
) {
  return async (dispatch) => {
    const adminToken = localStorage.getItem("admin_token");

    try {
      const response = await axios.get(
        `http://localhost:8000/api/admins/orders?page=${page}&search=${search}&sort=${sort}&status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      const { orderPaymentList, totalPages, itemsPerPage } = response.data;

      dispatch(setOrders(orderPaymentList));
      dispatch(setCurrentPage(page));
      dispatch(setTotalPages(totalPages));
      dispatch(setItemsPerPage(itemsPerPage));
    } catch (error) {
      console.log(error);
    }
  };
}

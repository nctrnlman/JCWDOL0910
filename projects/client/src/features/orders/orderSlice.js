import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orderList: [],
  },
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
  },
});

export const { setOrderList } = orderSlice.actions;

export default orderSlice.reducer;

export function fetchOrder(id_user, status) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/orders/order-list",
        {
          params: {
            id_user: id_user,
            status: status,
          },
        }
      );
      dispatch(setOrderList(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

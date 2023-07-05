import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast/CustomToast";
import CustomToastOptions from "../../components/CustomToast/CustomToastOptions";
export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orderList: [],
  },
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
    updatePaymentProof: (state, action) => {
      state.orderList.push(action.payload);
    },
  },
});

export const { setOrderList, updatePaymentProof } = orderSlice.actions;

export default orderSlice.reducer;

export function fetchOrder(id_user, status) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/orders/order-list",
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

export function uploadPaymentOrder(orderId, formData) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");

      const response = await axios.post(
        `http://localhost:8000/api/orders/upload-payment/${orderId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updatePaymentProof(response.data));
      console.log(response.data, "response data");
      toast(
        <CustomToast type={"success"} message={response.data.message} />,
        CustomToastOptions
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast(
        <CustomToast type="error" message={error.response.data} />,
        CustomToastOptions
      );
    }
  };
}

export function cancelOrder(orderId, id_user, status) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");

      let response = await axios.put(
        `http://localhost:8000/api/orders/cancel-order/${orderId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchOrder(id_user, status));

      toast(
        <CustomToast type={"success"} message={response.data.message} />,
        CustomToastOptions
      );
    } catch (error) {
      toast(
        <CustomToast type="error" message={error.response.data} />,
        CustomToastOptions
      );
      console.log(error);
    }
  };
}

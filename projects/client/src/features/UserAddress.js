import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToast from "../components/CustomToast/CustomToast";
import CustomToastOptions from "../components/CustomToast/CustomToastOptions";

export const AddressSLice = createSlice({
  name: "addresses",
  initialState: {
    addresses: [],
  },
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
  },
});

export const { setAddresses } = AddressSLice.actions;

export default AddressSLice.reducer;

export function getAddress() {
  return async (dispatch) => {
    try {
      const token = localStorage.user_token;
      if (token) {
        let response = await axios.get(
          `http://localhost:8000/api/user-profile/get-address`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setAddresses(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function addAddress(addressData) {
  return async (dispatch) => {
    const token = localStorage.getItem("user_token");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user-profile/add-address",
        addressData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(getAddress());
      toast(
        <CustomToast type="success" message={response.data.message} />,
        CustomToastOptions
      );
    } catch (error) {
      console.log("Error creating warehouse:", error);
    }
  };
}

export function deleteAddress(id_address) {
  return async (dispatch) => {
    const token = localStorage.getItem("user_token");
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/user-profile/delete-address/${id_address}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(getAddress());
    } catch (error) {
      console.error("Error deleting warehouse:", error);
    }
  };
}

export function setPrimaryAddress(id_address) {
  return async (dispatch) => {
    const token = localStorage.getItem("user_token");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user-profile/set-primary-address/${id_address}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getAddress());
    } catch (error) {
      console.error("Error set primary warehouse:", error);
    }
  };
}

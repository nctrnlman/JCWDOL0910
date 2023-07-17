import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast/CustomToast";
import CustomToastOptions from "../../components/CustomToast/CustomToastOptions";

export const allAdminsSlice = createSlice({
  name: "alladmins",
  initialState: {
    alladmins: null,
  },
  reducers: {
    setAllAdmins: (state, action) => {
      state.alladmins = action.payload;
    },
  },
});

export const { setAllAdmins } = allAdminsSlice.actions;

export default allAdminsSlice.reducer;

export function getAllAdmins() {
  return async (dispatch) => {
    try {
      const token = localStorage.admin_token;
      if (token) {
        let response = await axios.get(
          `http://localhost:8000/api/admins/all-admins`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setAllAdmins(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

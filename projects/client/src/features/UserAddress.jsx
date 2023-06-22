import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

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
    // console.log(localStorage.user_token)
    try {
      const token = localStorage.user_token;
      if (token) {
        console.log("hm");
        let response = await Axios.get(
          `http://localhost:8000/api/user-profile/get-address`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("slice", response);
        dispatch(setAddresses(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

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
    try {
      const token = localStorage.user_token;
      if (token) {
        let response = await Axios.get(
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

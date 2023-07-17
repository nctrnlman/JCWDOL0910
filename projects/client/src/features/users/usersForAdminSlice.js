import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const allUsersSlice = createSlice({
  name: "allusers",
  initialState: {
    allusers: null,
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.allusers = action.payload;
    },
  },
});

export const { setAllUsers } = allUsersSlice.actions;

export default allUsersSlice.reducer;

export function getAllUsers() {
  return async (dispatch) => {
    try {
      const token = localStorage.admin_token;
      if (token) {
        let response = await axios.get(
          `http://localhost:8000/api/admins/all-user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setAllUsers(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const ProfileSLice = createSlice({
  name: "profile",
  initialState: {
    profile: [],
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = ProfileSLice.actions;

export default ProfileSLice.reducer;

export function getProfile() {
  return async (dispatch) => {
    try {
      const token = localStorage.user_token;
      if (token) {
        let response = await Axios.get(
          `http://localhost:8000/api/user-profile/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setProfile(response.data[0]));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

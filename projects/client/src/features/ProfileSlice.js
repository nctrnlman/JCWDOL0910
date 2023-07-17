import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { toast } from "react-toastify";
import CustomToast from "../components/CustomToast/CustomToast";
import CustomToastOptions from "../components/CustomToast/CustomToastOptions";
import { showSuccessToast } from "../components/CustomToast/CustomNotification";

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

export function addProfilePic(data) {
  return async (dispatch) => {
    const userToken = localStorage.getItem("user_token");
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/user-profile/upload",
        data,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      dispatch(getProfile());
      console.log(response);
      showSuccessToast(response.data.message);
    } catch (error) {
      console.log(error);
      toast(
        <CustomToast type={"error"} message={error.response.data} />,
        CustomToastOptions
      );
    }
  };
}

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast/CustomToast";
import CustomToastOptions from "../../components/CustomToast/CustomToastOptions";

export const allUsersSlice = createSlice({
    name: "allusers",
    initialState: {
        allusers: null
    },
    reducers: {
        setAllUsers: (state, action) => {
            state.allusers = action.payload;
        }
    },
});

export const { setAllUsers } = allUsersSlice.actions;

export default allUsersSlice.reducer;

export function getAllUsers() {
    return async (dispatch) => {
        // console.log(localStorage.user_token)
        try {
            const token = localStorage.admin_token;
            // console.log("token dari profile slice", token)
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


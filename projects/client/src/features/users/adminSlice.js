import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast/CustomToast";
import CustomToastOptions from "../../components/CustomToast/CustomToastOptions";

const storedAdminDetails = localStorage.getItem("admin_details");
export const adminSlice = createSlice({
    name: "admins",
    initialState: {
        admin: storedAdminDetails ? JSON.parse(storedAdminDetails) : null,
        isLoading: false,
    },
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload.data;
            state.message = action.payload.message;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        resetAdmin: (state) => {
            state.admin = null;
        },
    },
});

export const { setIsLoading, setAdmin, resetAdmin } = adminSlice.actions;

export default adminSlice.reducer;

export function loginAdmin(data, callback) {
    return async (dispatch) => {
        dispatch(setIsLoading(true));
        try {
            console.log(data)
            let response = await axios.post(
                "http://localhost:8000/api/admins/login",
                data
            );
            console.log(response.data)
            dispatch(setAdmin(response.data));
            localStorage.setItem("admin_token", response.data.token);
            localStorage.setItem("exp_token", response.data.data.expToken);
            localStorage.setItem("admin_details", JSON.stringify(response.data.data)); // Save user details in local storage
            console.log(response, "login");
            if (typeof callback === "function") {
                callback();
            }
            // console.log()
            dispatch(setIsLoading(false));
            toast(
                <CustomToast type="success" message={response.data.message} />,
                CustomToastOptions
            );
        } catch (error) {
            console.log(error.response);
            dispatch(setIsLoading(false));
            // toast(
            //     <CustomToast type="error" message={error.response.data.message} />,
            //     CustomToastOptions
            // );
        }
    };
}

export function logoutAdmin() {
    return async (dispatch) => {
        try {
            dispatch(resetAdmin());
            localStorage.removeItem("admin_token");
            localStorage.removeItem("exp_token");
            localStorage.removeItem("admin_details");
            // localStorage.removeItem("cartCheckboxState");
            toast(
                <CustomToast type="warning" message="Logged out successfully" />,
                CustomToastOptions
            );
        } catch (error) {
            console.log(error);
            toast(
                <CustomToast type="error" message="Error occurred during logout" />,
                CustomToastOptions
            );
        }
    };
}

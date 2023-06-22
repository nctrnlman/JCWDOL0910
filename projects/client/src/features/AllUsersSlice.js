import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const AllUsersSLice = createSlice({
    name: "allusers",
    initialState: {
        allusers: [],
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
    },
});

export const { setAllUsers } = AllUsersSLice.actions;

export default AllUsersSLice.reducer;

export function getAllUsers() {
    return async (dispatch) => {
        // console.log(localStorage.user_token)
        try {
            const id_role = localStorage.user_details.id_role;
            const token = localStorage.user_token;
            console.log(id_role)
            if (id_role < 3) {
                console.log('hm')
                let response = await Axios.get(
                    `http://localhost:8000/admin/all-user`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log(response)
                dispatch(setAllUsers(response.data[0]));
            }

        } catch (error) {
            console.log(error);
        }
    }
}
import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const productCatSLice = createSlice({
    name: "productCategories",
    initialState: {
        productCategories: [],
    },
    reducers: {
        setProductCategories: (state, action) => {
            state.productCategories = action.payload;
        },
    },
});

export const { setProductCategories } = productCatSLice.actions;

export default productCatSLice.reducer;
export function getAllProductCategories() {
    return async (dispatch) => {
        try {
            let response = await Axios.get(
                "http://localhost:8000/product_categories/"
            );
            console.log('hm')
            console.log(response)
            dispatch(setProductCategories(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

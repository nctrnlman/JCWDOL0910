import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
export const LatestProductSLice = createSlice({
    name: "latestProducts",
    initialState: {
        latest_products: [],
    },
    reducers: {
        setLatestProducts: (state, action) => {
            state.latest_products = action.payload;
        },
    },
});

export const { setLatestProducts } = LatestProductSLice.actions;

export default LatestProductSLice.reducer;

export function getLatestProducts() {
    return async (dispatch) => {
        try {
            let response = await Axios.get(
                "http://localhost:8000/products/latest_products"
            );
            console.log('latest_products')
            console.log(response)
            dispatch(setLatestProducts(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

// const getLatestProducts = async () => {
//     try {
//         let response = await axios.get(
//             "http://localhost:8000/products/latest_products"
//         );
//         console.log('latest_products')
//         console.log(response)
//         dispatch(setLatestProducts(response.data));
//     } catch (error) {
//         console.log(error);
//     }
// };
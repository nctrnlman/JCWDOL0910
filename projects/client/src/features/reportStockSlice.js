import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const reportStockSlice = createSlice({
    name: "reportStock",
    initialState: {
        stock: {
            stockMovementHistory: []
        },
        //   topProduct: [],
        //   filteredProduct: [],
        //   categoryProduct: [],
        //   grossIncome: 0,
    },
    reducers: {
        setStockMovHis: (state, action) => {
            state.stock.stockMovementHistory = action.payload;
        }
    }
});

export const { setStockMovHis } = reportStockSlice.actions;

export default reportStockSlice.reducer;

export function fetchStockMovement(id_warehouse) {

    return async (dispatch) => {
        console.log("dari fetchstockmovement ", id_warehouse);
        const token = localStorage.admin_token;
        console.log("token fetchStockMovement", token)

        try {
            const response = await Axios.post(
                `http://localhost:8000/api/admins/stock-movement`,
                id_warehouse,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            dispatch(setStockMovHis(response.data));
            console.log(response)
            // }
        } catch (error) {
            console.log(error);
        }
    };
};
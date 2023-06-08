import { configureStore } from "@reduxjs/toolkit";
import ProductCatReducer from "../features/ProductCategoriesSlice";
import LatestProductReducer from "../features/LatestProductsSlice";

export const store = configureStore({
    reducer: {
        productCategories: ProductCatReducer,
        latestProducts: LatestProductReducer
    },
});
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import ProductCatReducer from "../features/ProductCategoriesSlice";
import LatestProductReducer from "../features/LatestProductsSlice";
import ProfileReducer from "../features/ProfileSlice";

export default configureStore({
  reducer: {
    users: userSlice,
    productCategories: ProductCatReducer,
    latestProducts: LatestProductReducer,
    profile: ProfileReducer

  },
});

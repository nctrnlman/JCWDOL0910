import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import ProductCatReducer from "../features/categories/ProductCategoriesSlice";
import productSlice from "../features/products/productSlice";
import cartSlice from "../features/carts/cartSlice";

export default configureStore({
  reducer: {
    users: userSlice,
    productCategories: ProductCatReducer,
    products: productSlice,
    carts: cartSlice,
  },
});

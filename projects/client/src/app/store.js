import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import ProductCatReducer from "../features/categories/ProductCategoriesSlice";
import productSlice from "../features/products/productSlice";
import cartSlice from "../features/carts/cartSlice";
import ProfileReducer from "../features/ProfileSlice";
import AddressesReducer from "../features/UserAddress";
import AllUserReducer from "../features/AllUsersSlice";

export default configureStore({
  reducer: {
    users: userSlice,
    productCategories: ProductCatReducer,
    products: productSlice,
    carts: cartSlice,
    profile: ProfileReducer,
    addresses: AddressesReducer,
    allusers: AllUserReducer
  },
});

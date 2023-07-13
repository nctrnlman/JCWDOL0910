import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import adminSlice from "../features/users/adminSlice";
import ProductCatReducer from "../features/categories/ProductCategoriesSlice";
import productSlice from "../features/products/productSlice";
import cartSlice from "../features/carts/cartSlice";
import ProfileReducer from "../features/ProfileSlice";
import AddressesReducer from "../features/UserAddress";
import warehouseSlice from "../features/warehouses/warehouseSlice";
import adminProductSlice from "../features/products/adminProductSlice";
import stockSlice from "../features/stocks/stocksSlice";
import stockMutationSlice from "../features/stock-mutation/stockMutationSlice";
import orderSlice from "../features/orders/orderSlice";
import orderListAdminSlice from "../features/orders/orderListAdminSlice";
import allUsersSlice from "../features/users/usersForAdminSlice";
import allAdminsSlice from "../features/users/adminsListSlice";
import reportTransactionSlice from "../features/reportTransactionSlice";
import reportStockSlice from "../features/reportStockSlice";

export default configureStore({
  reducer: {
    users: userSlice,
    productCategories: ProductCatReducer,
    products: productSlice,
    carts: cartSlice,
    profile: ProfileReducer,
    addresses: AddressesReducer,
    warehouses: warehouseSlice,
    orders: orderSlice,
    adminProducts: adminProductSlice,
    stockProducts: stockSlice,
    stockMutations: stockMutationSlice,
    orderListAdmin: orderListAdminSlice,
    admins: adminSlice,
    allusers: allUsersSlice,
    alladmins: allAdminsSlice,
    reportTransaction: reportTransactionSlice,
    reportStock: reportStockSlice,
  },
});

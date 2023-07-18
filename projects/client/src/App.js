import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginAdmin from "./pages/LoginAdmin";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import showToastProtectedRoutes from "./effects/showToastProtectedRoutes";
import setLastVisitedPage from "./effects/setLastVisitedPage";
import checkTokenExpiration from "./effects/checkTokenExpiration";
import {
  redirectWithoutUserToken,
  redirectWithoutAdminToken,
} from "./effects/redirectWithoutToken";
import navigateLastVisitedPage from "./effects/navigateLastVisitedPage";
import Navbar from "./components/Navbar/Navbar";
import DashboardAdmin from "./pages/DashboardAdmin";
import ProductsAdmin from "./pages/ProductsAdmin";
import WarehousesAdmin from "./pages/WarehousesAdmin";
import ReportingAdmin from "./pages/ReportingAdmin";
import CategoriesAdmin from "./pages/CategoriesAdmin";
import ReportingAdminStock from "./pages/ReportingAdminStock";
import LandingPage from "./pages/LandingPage";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Verification from "./pages/Verification";
import { fetchItemsCart } from "./features/carts/cartActions";
import OrderListAdmin from "./pages/OrderListAdmin";
import Cart from "./pages/Cart";
import OrderList from "./pages/OrderList";
import CreateOrder from "./pages/CreateOrder";
import Payment from "./pages/Payment";
import StocksAdmin from "./pages/StocksAdmin";
import StockMutationAdmin from "./pages/StockMutationAdmin";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import Profiling from "./pages/Profiling";
import { getAllProductCategories } from "./features/categories/ProductCategoriesSlice";
import { getProfile } from "./features/ProfileSlice";
import { checkUserOrders } from "./features/orders/orderSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("user_token");
  const adminToken = localStorage.getItem("admin_token");
  const adminRole = useSelector((state) =>
    state.admins.admin?.role?.toLowerCase()
  );
  const [shouldCheckUserOrders, setShouldCheckUserOrders] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const isAdminRoute = location.pathname.startsWith("/admin");
    setShowNavbar(!isAdminRoute);
  }, [location]);

  useEffect(() => {
    setLastVisitedPage(location);
  }, [location]);

  useEffect(() => {
    checkTokenExpiration(dispatch, navigate);
  }, [dispatch, navigate]);

  useEffect(() => {
    navigateLastVisitedPage(userToken, location, navigate);
  }, [userToken, location, navigate]);

  useEffect(() => {
    redirectWithoutUserToken(
      userToken,
      location.pathname,
      navigate,
      setShowToast
    );
    redirectWithoutAdminToken(adminToken, location.pathname, navigate);
  }, [userToken, adminToken, location.pathname, navigate]);

  useEffect(() => {
    showToastProtectedRoutes(showToast, setShowToast);
  }, [showToast]);

  useEffect(() => {
    if (userToken) {
      dispatch(fetchItemsCart());
      dispatch(getProfile());
    }
    setShouldCheckUserOrders(true);
  }, [userToken, dispatch]);

  useEffect(() => {
    if (shouldCheckUserOrders) {
      dispatch(checkUserOrders());
      setShouldCheckUserOrders(false);
    }
  }, [dispatch, shouldCheckUserOrders]);

  useEffect(() => {
    dispatch(getAllProductCategories());
  }, [dispatch]);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verification/" element={<Verification />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products/:category?" element={<Products />} />
        {userToken === null ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
            <Route path="/reset-password/" element={<ResetPassword />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
          </>
        ) : (
          <>
            <Route path="/profiling" element={<Profiling />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/payment/:id" element={<Payment />} />
          </>
        )}
        {adminToken && (
          <>
            <Route path="/admin-dashboard" element={<DashboardAdmin />} />
            <Route path="/admin-products" element={<ProductsAdmin />} />
            {adminRole === "super admin" && (
              <Route path="/admin-warehouses" element={<WarehousesAdmin />} />
            )}
            <Route path="/admin-categories" element={<CategoriesAdmin />} />
            <Route path="/admin-stocks" element={<StocksAdmin />} />
            <Route
              path="/admin-stock-mutation"
              element={<StockMutationAdmin />}
            />
            <Route path="/admin-order-list" element={<OrderListAdmin />} />
            <Route path="/admin-reporting" element={<ReportingAdmin />} />
            <Route
              path="/admin-reporting-stock"
              element={<ReportingAdminStock />}
            />
          </>
        )}
        <Route path="/admin-login" element={<LoginAdmin />} />
      </Routes>
    </div>
  );
}

export default App;

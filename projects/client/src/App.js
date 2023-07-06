import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import AdminCategory from "./pages/AdminCategory";
import StocksAdmin from "./pages/StocksAdmin";
import StockMutationAdmin from "./pages/StockMutationAdmin";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import Profiling from "./pages/Profiling";
import Cart from "./pages/Cart";
import OrderList from "./pages/OrderList";
import CreateOrder from "./pages/CreateOrder";
import Payment from "./pages/Payment";
import LandingPage from "./pages/LandingPage";
import ProductCategory from "./pages/ProductCategory";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Verification from "./pages/Verification";
import { fetchItemsCart } from "./features/carts/cartActions";
import OrderListAdmin from "./pages/OrderListAdmin";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("user_token");
  const adminToken = localStorage.getItem("admin_token");
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
    }
  }, [userToken, dispatch]);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/verification/" element={<Verification />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        {userToken === null ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
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
            <Route path="/admin-warehouses" element={<WarehousesAdmin />} />
            <Route path="/admin-categories" element={<AdminCategory />} />
            <Route path="/admin-stocks" element={<StocksAdmin />} />
            <Route
              path="/admin-stock-mutation"
              element={<StockMutationAdmin />}
            />
            <Route path="/admin-order-list" element={<OrderListAdmin />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;

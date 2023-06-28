import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Profiling from "./pages/Profiling";
import Cart from "./pages/Cart";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Verification from "./pages/Verification";
import LandingPage from "./pages/LandingPage";
import { fetchItemsCart } from "./features/carts/cartActions";
import ProductCategory from "./pages/ProductCategory";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Navbar from "./components/Navbar/Navbar";
import DashboardAdmin from "./pages/DashboardAdmin";
import showToastProtectedRoutes from "./effects/showToastProtectedRoutes";
import setLastVisitedPage from "./effects/setLastVisitedPage";
import checkTokenExpiration from "./effects/checkTokenExpiration";
import redirectWithoutToken from "./effects/redirectWithoutToken";
import navigateLastVisitedPage from "./effects/navigateLastVisitedPage";
import ProductsAdmin from "./pages/ProductsAdmin";
import WarehousesAdmin from "./pages/WarehousesAdmin";
import OrderList from "./pages/OrderList";
import AdminCategory from "./pages/AdminCategory";
import CreateOrder from "./pages/CreateOrder";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("user_token");
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
    redirectWithoutToken(userToken, location.pathname, navigate, setShowToast);
  }, [userToken, location.pathname, navigate]);

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
          </>
        )}
        <Route path="/" element={<LandingPage />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/verification/" element={<Verification />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/admin-dashboard" element={<DashboardAdmin />} />
        <Route path="/admin-products" element={<ProductsAdmin />} />
        <Route path="/admin-warehouses" element={<WarehousesAdmin />} />
        <Route path="/admin-categories" element={<AdminCategory />} />
      </Routes>
    </div>
  );
}

export default App;

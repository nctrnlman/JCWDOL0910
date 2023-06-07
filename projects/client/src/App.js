import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "./features/users/userSlice";
import Profiling from "./pages/Profiling";
import Cart from "./pages/Cart";
import { toast } from "react-toastify";
import CustomToast from "./components/CustomToast";
import CustomToastOptions from "./components/CustomToastOptions";
import Home from "./pages/Home";
import Verification from "./pages/Verification";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("user_token");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      sessionStorage.setItem(
        "lastVisitedPage",
        location.pathname + location.search
      );
    }
  }, [location]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const expToken = localStorage.getItem("exp_token");
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (expToken && parseInt(expToken) <= currentTimestamp) {
        dispatch(logoutUser());
        navigate("/login");
      }
    };
    checkTokenExpiration(); // Check token expiration on component mount
    // Check token expiration every second
    const interval = setInterval(checkTokenExpiration, 1000);
    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    if (
      userToken &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate(sessionStorage.getItem("lastVisitedPage")); //if user tried to access login or register when they login,the user will navigate into last visited page
    }
  }, [userToken, location.pathname, navigate]);

  useEffect(() => {
    if (
      !userToken &&
      (location.pathname === "/cart" || location.pathname === "/profiling")
    ) {
      navigate("/"); // Redirect to "/" if user without token tries to access "/cart" or "/profiling"
      setShowToast(true);
    }
  }, [userToken, location.pathname, navigate]);

  useEffect(() => {
    if (showToast) {
      toast(
        <CustomToast
          type="error"
          message={"You must be logged in to access this page."}
        />,
        CustomToastOptions
      );
      setShowToast(false);
    }
  }, [showToast]);

  return (
    <div>
      <Routes>
        {userToken === null ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/profiling" element={<Profiling />} />
            <Route path="/cart" element={<Cart />} />
          </>
        )}
        <Route path="/" element={<Home />} />
        <Route path="/verification/" element={<Verification />} />
      </Routes>
    </div>
  );
}

export default App;

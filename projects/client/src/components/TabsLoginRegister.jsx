import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function TabsLoginRegister() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="tabs-boxed grid grid-cols-2">
      <div
        className={`tab${isLoginPage ? " tab-bordered bg-white" : ""}`}
        onClick={() => {
          if (!isLoginPage) {
            navigate("/login");
          }
        }}
      >
        Login
      </div>
      <div
        className={`tab${!isLoginPage ? " tab-bordered bg-white" : ""}`}
        onClick={() => {
          if (isLoginPage) {
            navigate("/register");
          }
        }}
      >
        Register
      </div>
    </div>
  );
}

export default TabsLoginRegister;

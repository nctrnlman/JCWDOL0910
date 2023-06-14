import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const AuthButtons = ({ isMenuOpen, handleMenuToggle, showButtons }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="dropdown dropdown-end sm:hidden">
        <button className="btn btn-ghost text-sm" onClick={handleMenuToggle}>
          <GiHamburgerMenu />
        </button>
        {isMenuOpen && (
          <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box text-neutral gap-3 items-start">
            <li>
              <Link to="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="btn btn-ghost btn-sm">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
      {showButtons && (
        <div className="hidden sm:flex gap-2">
          <button
            to="/login"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          <button
            to="/register"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;

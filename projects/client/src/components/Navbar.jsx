import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/users/userSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const userToken = localStorage.getItem("user_token");

  const handleLogout = async () => {
    console.log("Logged out");
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 z-50 w-screen lg:w-full">
      <div className="flex-1">
        <a
          href="/"
          className="btn btn-ghost normal-case text-xl lg:text-3xl text-primary-focus italic"
        >
          Shopify
        </a>
      </div>
      <div className="flex flex-row gap-4">
        {userToken ? (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {/* <span className="badge badge-sm indicator-item">8</span> */}
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={`http://localhost:8000${user?.image}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
                    }}
                    alt=""
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-ghost sm:mr-4"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-ghost"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import CartDropdownCard from "../Cards/CartDropdownCard";

const UserDropdown = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.carts.totalQuantity);
  const cartItems = useSelector((state) => state.carts.cartItems);
  const isLargeScreen = window.innerWidth > 1024;
  const existing_profile = useSelector((state) => state.profile.profile);

  const handleLogout = async () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleCartIconClick = () => {
    if (!isLargeScreen) {
      navigate("/cart");
    }
  };

  return (
    <div className="flex flex-row md:gap-4 lg:gap-9 lg:px-5">
      {/* cart dropdown */}
      <div className="dropdown dropdown-end dropdown-hover">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator" onClick={handleCartIconClick}>
            <BsCart3 className="text-slate-100 text-2xl" />
            <span className="badge badge-sm indicator-item">
              {totalQuantity}
            </span>
          </div>
        </label>
        {isLargeScreen && <CartDropdownCard cartItems={cartItems} />}
      </div>
      {/* profile dropdown */}
      <div className="dropdown dropdown-bottom dropdown-end dropdown-hover flex">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar ml-1.5">
          <div className="w-10 rounded-full">
            <img
              src={`http://localhost:8000/${existing_profile.image_path}`}
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
            <a href="/profiling" className="justify-between">
              Profile
            </a>
          </li>
          <li>
            <a href="/orders" className="justify-between">
              Your Order
            </a>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
        <div
          className="text-base-100 justify-center ml-2 my-3 items-center hidden md:flex md:text-md lg:text-lg"
          style={{ textTransform: "capitalize" }}
        >
          {user.first_name}
        </div>
      </div>
    </div>
  );
};
export default UserDropdown;

import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/users/userSlice";
import { useDispatch } from "react-redux";

function CartNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logged out");
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleClickArrow = () => {
    navigate("/");
  };

  return (
    <div className="py-2 lg:py-20 flex flex-col bg-base-100  w-screen h-16 shadow-md">
      <div className="flex flex-row justify-between items-center">
        <button className="px-3 flex justify-center items-center text-2xl">
          <BsArrowLeft
            onClick={() => {
              handleClickArrow();
            }}
          />
        </button>
        <div className="px-2 flex justify-center items-center text-lg">
          Cart
        </div>
        <div className="text-2xl">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost m-1">
              <GiHamburgerMenu />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-1 p-2  bg-base-100 rounded-box w-52 border border-solid shadow-md"
            >
              <li>
                <a href="/profile" className="justify-between">
                  Profile
                </a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartNavbar;

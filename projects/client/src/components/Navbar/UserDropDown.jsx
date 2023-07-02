import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/users/userSlice";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.carts.totalQuantity);
  const cartItems = useSelector((state) => state.carts.cartItems);
  const isLargeScreen = window.innerWidth > 1024;

  const handleLogout = async () => {
    console.log("Logged out");
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleCartIconClick = () => {
    if (!isLargeScreen) {
      navigate("/cart");
    }
  };

  const handleClickItem = () => {
    navigate("/cart");
  };

  const handleClickButton = () => {
    navigate("/cart");
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
        {isLargeScreen && (
          <div className="mt-3 card card-compact dropdown-content w-[400px] h-auto bg-base-100 shadow">
            <div className="card-body">
              <div
                className="grid grid-row-1 gap-4 mt-4"
                style={{ maxHeight: "250px", overflowY: "auto" }}
              >
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row  hover:cursor-pointer"
                    onClick={() => {
                      handleClickItem();
                    }}
                  >
                    <img
                      src={`http://localhost:8000/${item.image_url}`}
                      alt={item.name}
                      className="w-12 h-12 mr-2"
                    />
                    <div>
                      <p className="text-base font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Price: {item.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-actions">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    handleClickButton();
                  }}
                >
                  View cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* profile dropdown */}
      <div className="dropdown dropdown-bottom dropdown-end dropdown-hover flex">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar ml-1.5">
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

import React from "react";
import { BsCart3 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/users/userSlice";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logged out");
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="flex flex-row px-2 lg:gap-9 lg:px-5">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <BsCart3 className="text-slate-100 text-2xl" />
            {/* <span className="badge badge-sm indicator-item">8</span> */}
          </div>
        </label>
        <div
          tabIndex={0}
          className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
        >
          <div className="card-body">
            <div className="card-actions">
              <button className="btn btn-primary btn-block">View cart</button>
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
  );
};
export default UserDropdown;

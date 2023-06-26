import React from "react";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import NavbarDashboardDrawer from "./NavbarDashboardDrawer";
import NavbarDashboardMenu from "./NavbarDashboardMenu";

function NavbarDashboard({ children }) {
  const navigate = useNavigate();
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-auto navbar bg-base-300">
          <NavbarDashboardDrawer />
          <div
            className="flex-1 px-2 mx-2 text-2xl font-bold hover:cursor-pointer text-primary italic md:text-3xl lg:text-4xl"
            onClick={() => {
              navigate("/admin-dashboard");
            }}
          >
            Shopify
          </div>
          {/* Navbar menu content here */}
          <NavbarDashboardMenu menuType="horizontal" />
        </div>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu menu-vertical items-start p-4 w-56 sm:w-64 h-full bg-base-200 justify-between">
          <div>
            <NavbarDashboardMenu menuType="vertical" />
          </div>
          <div className="absolute right-0 bottom-0">
            <li className="btn btn-wide justify-end items-end">
              <a href="/admin-login" className="text-lg">
                Logout <RiLogoutBoxLine />
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default NavbarDashboard;

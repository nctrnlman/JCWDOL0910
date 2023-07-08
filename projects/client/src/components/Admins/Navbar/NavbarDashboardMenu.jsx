import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";

function NavbarDashboardMenu({ menuType }) {
  const renderMenuItems = () => {
    if (menuType === "horizontal") {
      return (
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal gap-3 flex items-center">
            <li>
              <a href="/admin-products" className="text-[18px]">
                Products
              </a>
            </li>
            <li>
              <a href="/admin-order-list" className="text-[18px]">
                Orders
              </a>
            </li>
            <li className="dropdown dropdown-end dropdown-hover">
              <label tabIndex={0} className="text-[18px] m-1">
                Stocks
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="/admin-stocks" className="text-md">
                    Stock List
                  </a>
                </li>
                <li>
                  <a href="/admin-stock-mutation" className="text-md">
                    Stock Mutations
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="/admin-warehouses" className="text-[18px]">
                Warehouses
              </a>
            </li>
            <li>
              <a href="/admin-categories" className="text-[18px]">
                Categories
              </a>
            </li>

            <li className="flex justify-center items-center">
              <a href="/admin-login" className="text-[20px]">
                <RiLogoutBoxLine />
              </a>
            </li>
          </ul>
        </div>
      );
    } else if (menuType === "vertical") {
      return (
        <>
          <li>
            <a href="/admin-products" className="text-lg">
              Products
            </a>
          </li>
          <li>
            <a href="/admin-order-list" className="text-lg">
              Orders
            </a>
          </li>
          <div className=" px-4 py-2">
            <span className="text-lg">Stocks</span>
            <li>
              <a href="/admin-stocks" className="text-md">
                Stock List
              </a>
            </li>
            <li>
              <a href="/admin-stock-mutation" className="text-md">
                Stock Mutations
              </a>
            </li>
          </div>
          <li>
            <a href="/admin-warehouses" className="text-lg">
              Warehouses
            </a>
          </li>
          <li>
            <a href="/admin-categories" className="text-lg">
              Categories
            </a>
          </li>
        </>
      );
    }
  };

  return <div>{renderMenuItems()}</div>;
}

export default NavbarDashboardMenu;

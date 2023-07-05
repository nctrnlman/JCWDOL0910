import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";

function NavbarDashboardMenu({ menuType }) {
  const renderMenuItems = () => {
    if (menuType === "horizontal") {
      return (
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal gap-3 flex">
            <li>
              <a href="/admin-products" className="text-lg">
                Products
              </a>
            </li>
            <li>
              <a href="/admin-stocks" className="text-lg">
                Stocks
              </a>
            </li>
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
            <li>
              <a href="/admin-stock-mutation" className="text-lg">
                Stock Mutations
              </a>
            </li>
            <li className="flex justify-center items-center">
              <a href="/admin-login" className="text-xl">
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

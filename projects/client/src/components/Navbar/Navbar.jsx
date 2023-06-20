import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchInput from "./SearchInput";
import UserDropdown from "./UserDropDown";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  const userToken = localStorage.getItem("user_token");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.users.user);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar bg-gray-900 shadow-md fixed top-0 z-50 w-screen lg:w-full justify-between">
      <div className="hidden md:flex">
        <a
          href="/"
          className="btn btn-ghost normal-case text-2xl lg:text-4xl text-primary-focus italic"
        >
          Shopify
        </a>
      </div>
      <SearchInput />
      <div className="flex flex-row gap-2">
        {userToken ? (
          <UserDropdown key={user.id} user={user} />
        ) : (
          <div className="text-slate-100">
            <AuthButtons
              isMenuOpen={isMenuOpen}
              handleMenuToggle={handleMenuToggle}
              showButtons={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

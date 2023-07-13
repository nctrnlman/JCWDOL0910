import React from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import NavUserRegisterButton from "../Buttons/NavUserRegisterButton";
import NavUserLoginButton from "../Buttons/NavUserLoginButton";

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
              <NavUserLoginButton navigate={navigate} />
            </li>
            <li>
              <NavUserRegisterButton navigate={navigate} />
            </li>
          </ul>
        )}
      </div>
      {showButtons && (
        <div className="hidden sm:flex gap-2">
          <NavUserLoginButton navigate={navigate} />
          <NavUserRegisterButton navigate={navigate} />
        </div>
      )}
    </div>
  );
};

export default AuthButtons;

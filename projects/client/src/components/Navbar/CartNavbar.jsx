import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import AuthButtons from "./AuthButtons";

function CartNavbar() {
  const [isChecked, setIsChecked] = useState(true);
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const storedState = localStorage.getItem("cartCheckboxState");
    setIsChecked(storedState === "true");
  }, []);

  const handleCheckboxChange = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    localStorage.setItem("cartCheckboxState", newState);
  };
  const handleClickArrow = () => {
    navigate("/");
  };

  return (
    <div className="py-2 lg:py-24 flex flex-col shadow-md bg-base-100  w-screen h-24 ">
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
          <AuthButtons
            isMenuOpen={isMenuOpen}
            handleMenuToggle={handleMenuToggle}
            showButtons={false} // Set to true if you want to display the buttons
            className="right-0"
          />
        </div>
      </div>
      <div className="px-3 flex gap-4">
        <div className="form-control cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="checkbox checkbox-primary"
          />
        </div>
        <div className="text-gray-500 text-sm">
          <label>Select All Products</label>
        </div>
      </div>
    </div>
  );
}

export default CartNavbar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import CartNavbar from "../components/Navbar/CartNavbar";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import CartItems from "../components/Cart/CartItems";
import CartDrawer from "../components/Cart/CartDrawer";

function Cart() {
  const navigate = useNavigate();
  const isLargeScreen = window.innerWidth >= 1024;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cartItems = useSelector((state) => state.carts.cartItems);
  const totalPrice = useSelector((state) => state.carts.totalPrice);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleShopNow = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col bg-base-100 lg:py-16">
      {!isLargeScreen ? (
        <CartNavbar />
      ) : (
        <>
          <Navbar />
        </>
      )}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="bg-white p-4 shadow-md mb-2 h-screen">
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="text-gray-500">
              Please add some products to your cart.
            </p>
            <button
              className="px-4 py-2 mt-4 bg-primary text-white rounded-md"
              onClick={handleShopNow}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-row bg-base-100 mt-2 mb-0.5 px-2 rounded-sm">
              <div className="flex flex-row gap-2 shadow-sm w-screen h-auto">
                <div className="flex justify-center items-center">
                  <SlLocationPin />
                </div>
                <div className="flex justify-center items-center text-sm font-bold">
                  Add your address
                </div>
                <div
                  className="flex justify-center items-center cursor-pointer text-md"
                  onClick={handleDrawerToggle}
                >
                  <MdOutlineKeyboardArrowDown />
                </div>
              </div>
            </div>
            {cartItems.map((item) => (
              <CartItems key={item.id} item={item} />
            ))}
          </>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center border border-solid border-base-300">
        <p className="text-lg font-semibold">Total Price: {totalPrice}</p>
        <button className="px-4 py-2 bg-primary text-white rounded-md">
          Checkout
        </button>
      </div>
      {isDrawerOpen && <CartDrawer handleDrawerToggle={handleDrawerToggle} />}
    </div>
  );
}

export default Cart;

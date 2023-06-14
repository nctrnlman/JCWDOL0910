import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import CartNavbar from "../components/Navbar/CartNavbar";
import { SlLocationPin } from "react-icons/sl";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

function Cart() {
  const navigate = useNavigate();
  const isLargeScreen = window.innerWidth >= 1024;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const cartItems = useSelector((state) => state.carts.cartItems);
  const totalPrice = useSelector((state) => state.carts.totalPrice);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleOverlayClick = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleOverlayClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [isDrawerOpen]);

  const handleShopNow = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col bg-base-100 lg:py-24">
      {!isLargeScreen ? (
        <CartNavbar />
      ) : (
        <>
          <Navbar />
          {/* <CartNavbar /> */}
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
              <div key={item.id} className="bg-white p-4 shadow-md mb-2">
                <div className="flex flex-row items-center gap-5">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover mr-2"
                  />
                  <div>
                    <p className="text-sm uppercase lg:text-lg font-semibold">
                      {item.name}
                    </p>
                    <p className="text-sm lg:text-lg text-gray-500">
                      Price: {item.price}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <p className="text-sm lg:text-lg text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
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
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-end">
          <div
            ref={drawerRef}
            className="bg-white w-full max-w-lg flex flex-col absolute bottom-0"
          >
            {/* Drawer content goes here */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-bold text-lg">
                Where would you like to send your purchase?
              </h3>
              <p className="text-sm text-gray-400">
                To enhance your shopping experience, please select your address
                first.
              </p>
              <div className="flex flex-row gap-3">
                <div className="text-2xl">
                  <IoAddCircleOutline />
                </div>
                <div className="text-md font-bold">
                  <h3>Add your address</h3>
                </div>
                <div className="flex justify-center items-end text-xl">
                  <MdOutlineKeyboardArrowRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

import React, { useEffect, useRef } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function CartDrawer({ handleDrawerToggle }) {
  const drawerRef = useRef(null);

  const handleOverlayClick = (event) => {
    if (!drawerRef.current || !drawerRef.current.contains(event.target)) {
      handleDrawerToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, []);

  return (
    <div
      className="cart-drawer bg-white w-full flex flex-col absolute bottom-0"
      ref={drawerRef}
    >
      {/* Drawer content goes here */}
      <div className="p-4 flex flex-col gap-2 bg-base-100 border border-solid border-base-300 rounded-md lg:w-screen">
        <h3 className="font-bold text-lg">
          Where would you like to send your purchase?
        </h3>
        <p className="text-sm text-gray-400">
          To enhance your shopping experience, please select your address first.
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
  );
}

export default CartDrawer;

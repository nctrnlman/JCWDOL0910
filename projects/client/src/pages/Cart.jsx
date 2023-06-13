import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CartNavbar from "../components/Navbar/CartNavbar";

function Cart() {
  const isLargeScreen = window.innerWidth > 1024;

  return (
    <div className="h-screen flex flex-col">
      {!isLargeScreen ? (
        <CartNavbar />
      ) : (
        <>
          <Navbar />
          <CartNavbar />
        </>
      )}
      <div className="flex flex-row">
        <div className="px-12 py-20 flex flex-col lg:flex-row gap-20">
          <div className="bg-red-500">
            <h1 className="text-2xl">cart</h1>
          </div>
          <div className=" bg-yellow-500">cart</div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

import React from "react";

const CartItem = ({ item }) => {
  return (
    <div className="min-h-[50px] flex flex-col">
      <div className="bg-base-100 mb-4 rounded-lg shadow-lg p-4">
        <div className="hero-content justify-start lg:w-[600px]">
          <img
            src={`http://localhost:8000/${item.image_url}`}
            alt="item cart"
            className="w-[100px] lg:w-[100px] rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-base uppercase lg:text-3xl font-bold pb-3">
              {item.name}
            </h1>
            <p>Quantity: {item.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

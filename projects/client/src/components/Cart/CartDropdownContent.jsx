import React from "react";
import { useNavigate } from "react-router-dom";
import EmptyCartCard from "../Cards/EmptyCartCard";

function CartDropdownContent({ cartItems }) {
  const navigate = useNavigate();
  const handleClickItem = () => {
    navigate("/cart");
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="bg-white p-4 mb-2">
          <EmptyCartCard />
        </div>
      ) : (
        <div
          className="grid grid-row-1 gap-4 mt-4"
          style={{ maxHeight: "250px", overflowY: "auto" }}
        >
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-row  hover:cursor-pointer"
              onClick={() => {
                handleClickItem();
              }}
            >
              <img
                src={`http://localhost:8000/${item.image_url}`}
                alt={item.name}
                className="w-12 h-12 mr-2"
              />
              <div>
                <p className="text-base font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">Price: {item.price}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default CartDropdownContent;

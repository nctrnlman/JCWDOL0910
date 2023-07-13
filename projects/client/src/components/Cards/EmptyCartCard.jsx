import React from "react";

function EmptyCartCard() {
  return (
    <div>
      <p className="text-lg font-semibold">Your cart is empty</p>
      <p className="text-gray-500">Please add some products to your cart.</p>
    </div>
  );
}

export default EmptyCartCard;

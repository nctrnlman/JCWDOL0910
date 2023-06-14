import React from "react";

function CartItems({ item }) {
  return (
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
  );
}

export default CartItems;

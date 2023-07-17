import React from "react";
import CartItemsContent from "./CartItemsContent";
import ShopNowButton from "../Buttons/ShopNowButton";
import EmptyCartCard from "../Cards/EmptyCartCard";
import CheckoutButton from "../Buttons/CheckOutButton";

function CartContent({ cartItems, onQuantityChange, totalPrice }) {
  const disabled = cartItems.length === 0;
  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="bg-white p-4 shadow-md mb-2 h-screen">
            <EmptyCartCard />
            <ShopNowButton />
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItemsContent
                key={item.id_product}
                item={item}
                onQuantityChange={onQuantityChange}
              />
            ))}
          </>
        )}
      </div>
      <div className="bg-base-100 shadow-md p-4 flex justify-between items-center border border-solid border-base-300">
        <p className="text-lg font-semibold">Total Price: {totalPrice}</p>
        <CheckoutButton disabled={disabled} />
      </div>
    </>
  );
}

export default CartContent;

import React from "react";
import ViewCartButton from "../Buttons/ViewCartButton";
import CartDropdownContent from "../Cart/CartDropdownContent";

function CartDropdown({ cartItems }) {
  return (
    <div className="mt-3 card card-compact dropdown-content w-[400px] h-auto bg-base-100 shadow">
      <div className="card-body">
        <CartDropdownContent cartItems={cartItems} />
        <div className="card-actions">
          <ViewCartButton />
        </div>
      </div>
    </div>
  );
}

export default CartDropdown;

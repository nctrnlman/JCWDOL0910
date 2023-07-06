import React from "react";

function CancelOrderButton({ onClick }) {
  return (
    <label
      htmlFor="my_modal_6"
      className="btn btn-error text-xs w-1/2"
      onClick={onClick}
    >
      Cancel Order
    </label>
  );
}

export default CancelOrderButton;

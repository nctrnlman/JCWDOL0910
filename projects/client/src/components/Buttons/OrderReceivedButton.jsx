import React from "react";

function OrderReceivedButton({ onClick }) {
  return (
    <label
      htmlFor="confirm_order_user"
      className="btn btn-info text-xs w-3/4"
      onClick={onClick}
    >
      Pesanan diterima
    </label>
  );
}

export default OrderReceivedButton;

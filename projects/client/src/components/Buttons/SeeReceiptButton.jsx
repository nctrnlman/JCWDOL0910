import React from "react";

function SeeReceiptButton({ onClick }) {
  return (
    <label htmlFor="receipt_modal" className="btn" onClick={onClick}>
      See Receipt
    </label>
  );
}

export default SeeReceiptButton;

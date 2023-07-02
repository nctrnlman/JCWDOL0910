import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentButton({ orderId }) {
  const navigate = useNavigate();

  const handlePayNow = () => {
    navigate(`/payment/${orderId}`);
  };

  return (
    <button
      className="btn btn-primary btn-outline text-xs"
      onClick={handlePayNow}
    >
      Pay Now
    </button>
  );
}

export default PaymentButton;

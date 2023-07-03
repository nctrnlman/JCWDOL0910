import React from "react";
import { useDispatch } from "react-redux";
import { cancelOrder } from "../../features/orders/orderSlice";

function CancelOrderButton({ orderId, id_user, status }) {
  const dispatch = useDispatch();

  const handleCancelOrder = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(cancelOrder(orderId, id_user, status));
    }
  };

  return (
    <button className="btn btn-error text-xs w-1/2" onClick={handleCancelOrder}>
      Cancel Order
    </button>
  );
}

export default CancelOrderButton;

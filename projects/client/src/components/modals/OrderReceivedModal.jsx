import React from "react";
import { useDispatch } from "react-redux";
import {
  changeStatusToPesananDiterima,
  fetchOrder,
} from "../../features/orders/orderSlice";

function OrderReceivedModal({ order }) {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(changeStatusToPesananDiterima(order.id_order));
  };
  return (
    <div>
      <input type="checkbox" id="confirm_order_user" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure your order #{order.id_order} has arrived?
          </p>
          <div className="modal-action">
            <label
              htmlFor="confirm_order_user"
              className="btn btn-error"
              onClick={handleConfirm}
            >
              Yes
            </label>
            <label htmlFor="confirm_order_user" className="btn btn-info">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderReceivedModal;

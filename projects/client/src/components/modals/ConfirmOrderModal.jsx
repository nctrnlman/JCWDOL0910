import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchOrderPaymentList } from "../../features/orders/orderListAdminSlice";
import {
  showErrorToast,
  showSuccessToast,
} from "../CustomToast/CustomNotification";

function ConfirmOrderModal({ selectedId }) {
  const dispatch = useDispatch();
  const confirmButton = async () => {
    try {
      let response = await axios.post(
        `http://localhost:8000/api/admins/orders/payment/confirm?id_order=${selectedId}`
      );
      dispatch(fetchOrderPaymentList());
      showSuccessToast(response.data.message);
    } catch (error) {
      console.log(error);
      showErrorToast(error.response.data.message);
    }
  };
  return (
    <dialog id="confirm_order" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Confirmation Order</h3>
        <p>Are you sure you want to confirm this order: #{selectedId}</p>
        <div className="modal-action">
          <button className="btn btn-error" onClick={confirmButton}>
            Yes
          </button>
          <button className="btn btn-info">No</button>
        </div>
      </form>
    </dialog>
  );
}

export default ConfirmOrderModal;

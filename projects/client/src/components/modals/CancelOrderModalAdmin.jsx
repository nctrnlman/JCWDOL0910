import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchOrderPaymentList } from "../../features/orders/orderListAdminSlice";
import CustomToast from "../CustomToast/CustomToast";
import { toast } from "react-toastify";
import {
  showErrorToast,
  showInfoToast,
} from "../CustomToast/CustomNotification";

function CancelOrderModalAdmin({ selectedId }) {
  const dispatch = useDispatch();
  const cancelButton = async () => {
    try {
      let response = await axios.post(
        `http://localhost:8000/api/admins/orders/cancel?id_order=${selectedId}`
      );
      console.log(response);
      showInfoToast(response.data.message);
      dispatch(fetchOrderPaymentList());
    } catch (error) {
      console.log(error);
      showErrorToast(error.response.data.message);
    }
  };
  return (
    <dialog id="cancel_order" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Cancel Order Confirmation</h3>
        <p>Are you sure you want to cancel this order: #{selectedId}</p>
        <div className="modal-action">
          <button className="btn btn-error" onClick={cancelButton}>
            Yes
          </button>
          <button className="btn btn-info">No</button>
        </div>
      </form>
    </dialog>
  );
}

export default CancelOrderModalAdmin;

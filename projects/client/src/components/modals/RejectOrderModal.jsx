import axios from "axios";
import React from "react";
import { fetchOrderPaymentList } from "../../features/orders/orderListAdminSlice";
import { useDispatch } from "react-redux";

function RejectOrderModal({ selectedId }) {
  const dispatch = useDispatch();

  const rejectButton = async () => {
    try {
      let response = await axios.post(
        `http://localhost:8000/api/admins/orders/payment/reject?id_order=${selectedId}`
      );
      console.log(response);
      dispatch(fetchOrderPaymentList());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <dialog id="reject_modal" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Reject Order</h3>
        <p>Are you sure you want to reject this order: #{selectedId}</p>
        <div className="modal-action">
          <button className="btn btn-error" onClick={rejectButton}>
            Yes
          </button>
          <button className="btn btn-info">No</button>
        </div>
      </form>
    </dialog>
  );
}

export default RejectOrderModal;

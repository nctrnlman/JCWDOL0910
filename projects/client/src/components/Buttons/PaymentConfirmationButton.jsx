import React from "react";
import Axios from "axios";

function PaymentConfirmationButton(props) {
  const { id_order } = props;

  const confirmButton = async (e, id_order) => {
    e.preventDefault();
    try {
      let response = await Axios.post(
        `http://localhost:8000/api/admins/orders/payment/confirm?id_order=${id_order}`
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const rejectButton = async (e, id_order) => {
    e.preventDefault();
    try {
      let response = await Axios.post(
        `http://localhost:8000/api/admins/orders/payment/reject?id_order=${id_order}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg"
        onClick={rejectButton}
      >
        Reject
      </button>
      <button
        className="btn btn-primary  btn-xs sm:btn-sm md:btn-md lg:btn-lg"
        onClick={confirmButton}
      >
        Approve
      </button>
    </div>
  );
}

export default PaymentConfirmationButton;

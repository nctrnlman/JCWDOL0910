import React from "react";

function ReceiptModal({ orderId, paymentInfo }) {
  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Receipt Order: #{orderId}</h3>
          <img
            src={`http://localhost:8000${paymentInfo}`}
            alt="Payment Proof"
            className="py-4"
          />
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceiptModal;

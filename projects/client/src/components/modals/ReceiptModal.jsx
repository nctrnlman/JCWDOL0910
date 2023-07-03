import React from "react";

function ReceiptModal({ order }) {
  return (
    <>
      <input type="checkbox" id="receipt_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="text-center p-2 mb-3">
            <h3 className="font-bold text-lg">
              Receipt Order: #{order.id_order}
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <p>Remitter: {order.remitter}</p>
            <p>Bank Name: {order.bank_name}</p>
            <p>Account Number: {order.account_number}</p>
            <img
              src={`http://localhost:8000${order.payment_proof}`}
              alt="Payment Proof"
              className="py-4"
            />
          </div>
          <div className="modal-action">
            <label htmlFor="receipt_modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceiptModal;

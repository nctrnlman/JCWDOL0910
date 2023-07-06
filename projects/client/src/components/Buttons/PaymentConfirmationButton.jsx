import React from "react";

function PaymentConfirmationButton({ id_order, setId, status }) {
  const handleConfirm = () => {
    setId(id_order);
    window.confirm_order.showModal();
  };

  const handleClick = () => {
    setId(id_order);
    window.reject_modal.showModal();
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        className="btn btn-success btn-xs lg:btn-sm"
        onClick={handleConfirm}
        disabled={status !== "Menunggu Konfirmasi Pembayaran"}
      >
        Confirm
      </button>
      <button
        className="btn btn-primary btn-xs lg:btn-sm"
        onClick={handleClick}
        disabled={
          status !== "Menunggu Konfirmasi Pembayaran" && status !== "Diproses"
        }
      >
        Reject
      </button>
    </div>
  );
}

export default PaymentConfirmationButton;

import React from "react";

function PaymentConfirmationButton({ id_order, setSelectedId, status }) {
  const handleConfirm = () => {
    setSelectedId(id_order);
    window.confirm_order.showModal();
  };

  const handleClick = () => {
    setSelectedId(id_order);
    window.reject_modal.showModal();
  };

  if (status === "Menunggu Konfirmasi Pembayaran") {
    return (
      <div className="flex flex-col gap-2">
        <button
          className="btn btn-success btn-xs lg:btn-sm"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          className="btn btn-error btn-xs lg:btn-sm"
          onClick={handleClick}
        >
          Reject
        </button>
      </div>
    );
  } else if (
    status !== "Menunggu Konfirmasi Pembayaran" &&
    status !== "Diproses"
  ) {
    return <p>No actions available.</p>;
  }
}

export default PaymentConfirmationButton;

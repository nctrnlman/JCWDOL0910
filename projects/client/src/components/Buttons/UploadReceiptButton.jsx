import React from "react";

function UploadReceiptButton({ disabled, onClick }) {
  return (
    <div className="card-actions justify-end">
      <a
        href="#upload_receipt_modal"
        className="btn btn-primary"
        disabled={disabled}
        onClick={onClick}
      >
        Upload Receipt
      </a>
    </div>
  );
}

export default UploadReceiptButton;

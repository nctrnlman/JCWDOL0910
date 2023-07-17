import React from "react";

function CancelOrderButtonAdmin({ id_order, setSelectedId, status }) {
  const handleCancel = () => {
    setSelectedId(id_order);
    window.cancel_order.showModal();
  };

  if (status === "Diproses") {
    return (
      <div className="flex flex-col gap-2">
        <button
          className="btn btn-warning btn-xs lg:btn-sm"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default CancelOrderButtonAdmin;

import React from "react";

function CancelOrderModal({ order, onclick }) {
  const handleCancelOrder = () => {
    onclick();
  };
  return (
    <div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to cancel this Order: #{order.id_order}?
          </p>
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              className="btn btn-error"
              onClick={handleCancelOrder}
            >
              Yes
            </label>
            <label htmlFor="my_modal_6" className="btn btn-info">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelOrderModal;

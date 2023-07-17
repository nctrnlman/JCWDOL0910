import React from "react";

function SendOrderButton({ id_order, setSelectedId, status }) {
  const handleSend = () => {
    setSelectedId(id_order);
    window.send_order.showModal();
  };

  if (status === "Diproses") {
    return (
      <div className="flex flex-col gap-2">
        <button className="btn btn-info btn-xs lg:btn-sm" onClick={handleSend}>
          Send
        </button>
      </div>
    );
  }
}

export default SendOrderButton;

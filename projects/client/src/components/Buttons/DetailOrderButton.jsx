import React from "react";
import { useNavigate } from "react-router";

function DetailOrderButton({}) {
  const navigate = useNavigate();

  const handleDetailOrder = () => {
    navigate(`/`);
  };

  return (
    <button
      className="btn btn-info btn-outline text-xs"
      onClick={handleDetailOrder}
    >
      Detail Order
    </button>
  );
}

export default DetailOrderButton;

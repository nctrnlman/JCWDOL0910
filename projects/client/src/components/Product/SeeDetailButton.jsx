import React from "react";
import { useNavigate } from "react-router";

function SeeDetailButton({ productId }) {
  const navigate = useNavigate();

  const handleSeeDetail = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <button
      className="btn btn-outline text-[8px] lg:text-xs"
      onClick={handleSeeDetail}
    >
      See Detail
    </button>
  );
}

export default SeeDetailButton;

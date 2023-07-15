import React from "react";
import { useNavigate } from "react-router-dom";

function ShopNowButton() {
  const navigate = useNavigate();
  const handleShopNow = () => {
    navigate("/");
  };

  return (
    <button
      className="px-4 py-2 mt-4 bg-primary text-white rounded-md"
      onClick={handleShopNow}
    >
      Shop Now
    </button>
  );
}

export default ShopNowButton;

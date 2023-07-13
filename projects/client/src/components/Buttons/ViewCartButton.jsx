import React from "react";
import { useNavigate } from "react-router-dom";

function ViewCartButton() {
  const navigate = useNavigate();
  const handleClickButton = () => {
    navigate("/cart");
  };
  return (
    <button
      className="btn btn-primary btn-block"
      onClick={() => {
        handleClickButton();
      }}
    >
      View cart
    </button>
  );
}

export default ViewCartButton;

import React from "react";

function AddToCartButton() {
  const handleButtonClick = () => {
    // Handle button click event
  };

  const isUserLoggedIn = !!localStorage.getItem("user_token"); // Check if user_token exists in localStorage

  return (
    <button
      onClick={handleButtonClick}
      disabled={!isUserLoggedIn}
      className="btn btn-secondary"
    >
      Add To Cart
    </button>
  );
}

export default AddToCartButton;

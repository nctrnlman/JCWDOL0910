import React from "react";

function BuyNowButton() {
  const handleButtonClick = () => {
    // Handle button click event
  };

  const isUserLoggedIn = !!localStorage.getItem("user_token"); // Check if user_token exists in localStorage

  return (
    <button
      onClick={handleButtonClick}
      disabled={!isUserLoggedIn}
      className="btn btn-secondary text-xs"
    >
      Buy Now
    </button>
  );
}

export default BuyNowButton;

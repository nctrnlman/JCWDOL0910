import React from "react";

function VerificationButton() {
  return (
    <button
      className="text-xs ml-2 text-primary-focus font-semibold hover:underline"
      onClick={() => window.verification.showModal()}
    >
      Verification
    </button>
  );
}

export default VerificationButton;

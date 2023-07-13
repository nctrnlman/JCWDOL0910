import React from "react";

function RegisterUserButton({ isLoading }) {
  return (
    <>
      <button
        className="btn btn-primary disabled:btn-disabled"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-dots"></span>
        ) : (
          "Register"
        )}
      </button>
    </>
  );
}

export default RegisterUserButton;

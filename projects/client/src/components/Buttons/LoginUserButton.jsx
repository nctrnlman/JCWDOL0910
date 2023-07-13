import React from "react";

function LoginUserButton({ isLoading }) {
  return (
    <>
      <button
        className="btn btn-primary disabled:btn-disabled"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <span className="loading loading-dots"></span> : "Login"}
      </button>
    </>
  );
}

export default LoginUserButton;

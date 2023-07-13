import React from "react";

function NavUserLoginButton({ navigate }) {
  return (
    <>
      <button
        to="/login"
        className="btn btn-ghost btn-sm"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
    </>
  );
}

export default NavUserLoginButton;

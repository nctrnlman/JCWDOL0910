import React from "react";

function NavUserRegisterButton({ navigate }) {
  return (
    <>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => {
          navigate("/register");
        }}
      >
        Register
      </button>
    </>
  );
}

export default NavUserRegisterButton;

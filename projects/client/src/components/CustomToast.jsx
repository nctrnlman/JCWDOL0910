import React from "react";
import { toast } from "react-toastify";

const CustomToast = ({ message, type }) => {
  const handleToastClose = () => {
    toast.dismiss(); // Dismiss the toast when the alert is closed
  };

  let alertClass;
  switch (type) {
    case "success":
      alertClass = "alert-success";
      break;
    case "info":
      alertClass = "alert-info";
      break;
    case "warning":
      alertClass = "alert-warning";
      break;
    default:
      alertClass = "alert-error";
      break;
  }

  return (
    <div className={`alert ${alertClass}`}>
      <button
        className="absolute top-2 right-2 p-1 text-2xl cursor-pointer"
        onClick={handleToastClose}
      >
        &times;
      </button>
      <span>{message}</span>
    </div>
  );
};

export default CustomToast;

import React from "react";
import CustomToast from "../components/CustomToast/CustomToast";
import { toast } from "react-toastify";
import CustomToastOptions from "../components/CustomToast/CustomToastOptions";

function showToastProtectedRoutes(showToast, setShowToast) {
  if (showToast) {
    toast(
      <CustomToast
        type="error"
        message={"You must be logged in to access this page."}
      />,
      CustomToastOptions
    );
    setShowToast(false);
  }
}

export default showToastProtectedRoutes;

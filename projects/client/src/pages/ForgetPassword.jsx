import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import CustomToast from "../components/CustomToast/CustomToast";
import CustomToastOptions from "../components/CustomToast/CustomToastOptions";
import ForgetPasswordForm from "../components/Form/ForgetPasswordForm";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);

      let response = await Axios.post(
        "http://localhost:8000/api/users/forget-password",
        values
      );

      toast(
        <CustomToast type="success" message={response.data.message} />,
        CustomToastOptions
      );

      if (response.data.success) {
        setIsLoading(false);
        navigate("/login");
      }
    } catch (error) {
      setTimeout(() => {
        toast(
          <CustomToast type="error" message={error.response.data.message} />,
          CustomToastOptions
        );
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="hero min-h-screen bg-slate-100">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-center">
          <h1 className="text-4xl lg:text-5xl p-6 font-bold">
            Forget Password
          </h1>
        </div>
        <div className="card flex-shrink-0 w-[300px] lg:w-[400px] shadow-2xl bg-base-100">
          <div className="card-body">
            <ForgetPasswordForm
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

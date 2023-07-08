import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomToast from "../components/CustomToast/CustomToast";
import CustomToastOptions from "../components/CustomToast/CustomToastOptions";
import VerificationForm from "../components/Form/VerificationForm";

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const initialValues = {
    otp: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string().required("Verification Code is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)/,
        "Password must have at least 1 uppercase letter and 1 digit"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = async (values) => {
    try {
      let response = await Axios.post(
        "http://localhost:8000/api/users/verification",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast(
        <CustomToast type="success" message={response.data.message} />,
        CustomToastOptions
      );

      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      toast(
        <CustomToast type="error" message={error.response.data.message} />,
        CustomToastOptions
      );
    }
  };

  return (
    <div className="hero min-h-screen bg-slate-100">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-center">
          <h1 className="text-4xl lg:text-5xl p-6 font-bold">
            Verify Your Account
          </h1>
        </div>
        <div className="card flex-shrink-0 w-[300px] lg:w-[400px] shadow-2xl bg-base-100">
          <div className="card-body">
            <VerificationForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;

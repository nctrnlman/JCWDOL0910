import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomToast from "../components/CustomToast/CustomToast";
import CustomToastOptions from "../components/CustomToast/CustomToastOptions";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Verification() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    otp: Yup.string().required("Verification Code "),
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

      if (response.data.success == true) {
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
        <div className="card flex-shrink-0  w-[300px] lg:w-[400px]  shadow-2xl bg-base-100">
          <div className="card-body">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Verification Code </span>
                  </label>
                  <Field
                    type="text"
                    name="otp"
                    placeholder=""
                    className="input input-bordered"
                  />
                  <ErrorMessage
                    name="otp"
                    component="div"
                    className="text-red-500 text-[9px] lg:text-[13px] pt-1"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder=""
                      className="input input-bordered pr-[40px] lg:pr-[138px] "
                    />
                    {showPassword ? (
                      <AiFillEyeInvisible
                        className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <AiFillEye
                        className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-[9px] lg:text-[13px] pt-1"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder=""
                      className="input input-bordered pr-[40px] lg:pr-[138px]"
                    />
                    {showConfirmPassword ? (
                      <AiFillEyeInvisible
                        className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    ) : (
                      <AiFillEye
                        className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-[9px] lg:text-[13px] lg:text-sm pt-1"
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;

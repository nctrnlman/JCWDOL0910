import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import CustomToast from "../components/CustomToast/CustomToast";
import { toast } from "react-toastify";
import CustomToastOptions from "../components/CustomToast/CustomToastOptions";

function Verification() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.length && confirmPassword.length < 6) {
        toast(
          <CustomToast
            type="success"
            message="Minimum password is 6 characters"
          />,
          CustomToastOptions
        );
      } else {
        let response = await Axios.post(
          "http://localhost:8000/api/users/verification",
          { otp, password, confirmPassword },
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
      }
      navigate("/login");
    } catch (error) {
      toast(
        <CustomToast type="success" message="Failed to Verified" />,
        CustomToastOptions
      );
    }
  };

  return (
    <div className="hero min-h-screen bg-slate-100">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-center">
          <h1 className="text-6xl p-6 font-bold ">Verified Your Account</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">OTP Code</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="input input-bordered"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder=""
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder=""
                className="input input-bordered"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button
                className="btn bg-gray-900 text-white "
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;

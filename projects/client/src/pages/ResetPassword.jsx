import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import CustomToast from "../components/CustomToast";
import { toast } from "react-toastify";
import CustomToastOptions from "../components/CustomToastOptions";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await Axios.post(
        "http://localhost:8000/users/reset-password",
        { newPassword, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      toast(
        <CustomToast type="success" message={response.data.message} />,
        CustomToastOptions
      );
      navigate("/");
    } catch (error) {
      alert("gagal");
      console.error(error);
    }
  };

  console.log({ token });

  return (
    <div className="hero min-h-screen bg-slate-100">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-center">
          <h1 className="text-6xl p-6 font-bold ">Reset Password</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                type="password"
                placeholder="Input your new password"
                className="input input-bordered"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Input your confirm password"
                className="input input-bordered"
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

export default ResetPassword;

import Axios from "axios";
import React, { useState } from "react";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await Axios.post(
        "http://localhost:8000/users/forget-password",
        { email }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="hero min-h-screen bg-slate-100">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-center">
          <h1 className="text-6xl p-6 font-bold ">Forget Password</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Input your Email"
                value={email}
                className="input input-bordered"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button
                className="btn bg-gray-900 text-white"
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

export default ForgetPassword;

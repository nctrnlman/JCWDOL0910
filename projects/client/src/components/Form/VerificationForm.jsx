import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";

const VerificationForm = ({
  initialValues,
  validationSchema,
  handleSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Verification Code</span>
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiFillEye
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
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
              className="input input-bordered pr-[40px] lg:pr-[138px] "
            />
            {showConfirmPassword ? (
              <AiFillEyeInvisible
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <AiFillEye
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </div>
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className="text-red-500 text-[9px] lg:text-[13px] pt-1"
          />
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default VerificationForm;

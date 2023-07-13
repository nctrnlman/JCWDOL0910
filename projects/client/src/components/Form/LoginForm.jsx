import React from "react";
import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import LoginUserButton from "../Buttons/LoginUserButton";

const LoginForm = ({ isLoading }) => {
  const { touched, errors } = useFormikContext();
  return (
    <Form action="#" method="POST" className="form-control">
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <Field
        type="email"
        name="email"
        placeholder="Enter your email"
        autoComplete="current-email"
        className={`input input-bordered ${
          touched.email && errors.email ? "input-error" : ""
        }`}
      />
      <ErrorMessage
        component="div"
        name="email"
        style={{ color: "red", fontSize: "12px" }}
      />
      <label className="label">
        <span className="label-text">password</span>
      </label>
      <Field
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        className={`input input-bordered ${
          touched.password && errors.password ? "input-error" : ""
        }`}
      />
      <ErrorMessage
        component="div"
        name="password"
        style={{ color: "red", fontSize: "12px" }}
      />
      <div className="mt-5 flex flex-row justify-end">
        <a
          href="/forget-password"
          className="text-xs ml-2 text-primary-focus font-semibold hover:underline"
        >
          Forget Password?
        </a>
      </div>
      <div className="form-control mt-6">
        <LoginUserButton isLoading={isLoading} />
      </div>
    </Form>
  );
};

export default LoginForm;

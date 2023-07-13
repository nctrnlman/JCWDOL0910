import React from "react";
import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import RegisterUserButton from "../Buttons/RegisterUserButton";

const RegisterForm = ({ isLoading }) => {
  const { touched, errors } = useFormikContext();
  return (
    <Form action="#" method="POST" className="form-control">
      <label className="label">
        <span className="label-text">First Name</span>
      </label>
      <Field
        type="text"
        name="first_name"
        placeholder="Enter your first name"
        className={`input input-bordered ${
          touched.firstname && errors.firstname ? "input-error" : ""
        }`}
      />
      <ErrorMessage
        component="div"
        name="first_name"
        style={{ color: "red", fontSize: "12px" }}
      />

      <label className="label">
        <span className="label-text">Last Name</span>
      </label>
      <Field
        type="text"
        name="last_name"
        placeholder="Enter your last name"
        className={`input input-bordered ${
          touched.lastname && errors.lastname ? "input-error" : ""
        }`}
      />
      <ErrorMessage
        component="div"
        name="last_name"
        style={{ color: "red", fontSize: "12px" }}
      />
      <div className="flex flex-row gap-10 justify-center items-center pt-5 ">
        <div>
          <label className="label">
            <Field type="radio" name="gender" value="male" className="radio" />
            <span className="radio-mark"></span>
            Male
          </label>
        </div>
        <div>
          <label className="label">
            <Field
              type="radio"
              name="gender"
              value="female"
              className="radio"
            />
            <span className="radio-mark"></span>
            Female
          </label>
        </div>
      </div>
      <ErrorMessage
        component="div"
        name="gender"
        style={{ color: "red", fontSize: "12px" }}
      />
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <Field
        type="email"
        name="email"
        placeholder="Enter your email"
        className={`input input-bordered ${
          touched.email && errors.email ? "input-error" : ""
        }`}
      />
      <ErrorMessage
        component="div"
        name="email"
        style={{ color: "red", fontSize: "12px" }}
      />
      <div className="form-control mt-6">
        <RegisterUserButton isLoading={isLoading} />
      </div>
    </Form>
  );
};

export default RegisterForm;

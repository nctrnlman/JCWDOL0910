import React from "react";
import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import TabsLoginRegister from "../TabsLoginRegister";

const RegisterForm = ({ isLoading }) => {
  const { touched, errors } = useFormikContext();
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">Welcome!</h1>
          <p className="py-6">
            Join us now and start shopping for amazing products. Register today
            and unlock a world of endless possibilities.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <TabsLoginRegister />
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
                    <Field
                      type="radio"
                      name="gender"
                      value="male"
                      className="radio"
                    />
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
                <button
                  className="btn btn-primary disabled:btn-disabled"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-dots"></span>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </Form>
          </div>
          <div className="flex justify-center items-center pb-4">
            <div
              target="_blank"
              className="
                    inline-flex
                    items-center
                    text-gray-700
                    font-medium
                    text-xs text-center
                    "
            >
              <span className="ml-2 text-base-content">
                Already have an account?
                <a
                  href="/login"
                  className="text-xs ml-2 text-primary-focus font-semibold hover:underline"
                >
                  Sign In
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

import React from "react";
import { Form, Field, ErrorMessage } from "formik";
import TabsLoginRegister from "../TabsLoginRegister";

const LoginForm = ({ isLoading, errors, touched }) => {
    return (
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold">Welcome Admins!</h1>
                    <p className="py-6">
                        Login now and start managing your products and orders.
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        {/* <TabsLoginRegister /> */}
                        <Form action="#" method="POST" className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                autoComplete="current-email"
                                className={`input input-bordered ${touched.email && errors.email ? "input-error" : ""
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
                                className={`input input-bordered ${touched.password && errors.password ? "input-error" : ""
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
                                <button
                                    className="btn btn-primary disabled:btn-disabled"
                                    type="submit"
                                    disabled={isLoading} // disable the button if isSubmitting or isLoading is true
                                >
                                    {isLoading ? (
                                        <span className="loading loading-dots"></span>
                                    ) : (
                                        "Login"
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
                                Not an admin?
                                <a
                                    href="/login"
                                    className="text-xs ml-2 text-primary-focus font-semibold hover:underline"
                                >
                                    Go back here
                                </a>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginForm;

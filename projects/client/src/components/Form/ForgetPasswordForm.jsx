import React from "react";
import Loading from "react-loading";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ForgetPasswordForm = ({ handleSubmit, isLoading }) => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <Field
              type="email"
              name="email"
              className="input input-bordered"
              disabled={isLoading || isSubmitting}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-[9px] lg:text-[13px] pt-1"
            />
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || isSubmitting}
            >
              {isLoading ? (
                <Loading type="spin" color="#fff" height={20} width={20} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ForgetPasswordForm;

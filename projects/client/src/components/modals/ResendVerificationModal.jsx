import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { resendEmail } from "../../features/users/userSlice";
import * as Yup from "yup";

const ResendVerificationModal = () => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(resendEmail({ email: values.email }));
      resetForm();
    },
  });

  const handleModalClose = () => {
    formik.resetForm();
  };
  const isEmailInvalid =
    !formik.values.email || (formik.touched.email && formik.errors.email);
  return (
    <dialog id="verification" className="modal">
      <form method="dialog" className="modal-box">
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-xl text-center">Verification!</h3>
          <div>
            <label className="label label-text text-lg">Email :</label>
            <input
              type="text"
              placeholder="Enter Your Email"
              className="input input-bordered w-full"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>
        </div>
        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={() => {
              formik.handleSubmit();
            }}
            disabled={isEmailInvalid}
          >
            Send
          </button>
          <button className="btn" onClick={handleModalClose}>
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ResendVerificationModal;

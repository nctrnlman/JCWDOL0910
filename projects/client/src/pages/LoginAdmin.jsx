import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LoginAdmin from "../components/Form/LoginAdmin";
import { loginAdmin } from "../features/users/adminSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email cannot be empty")
      .email("Wrong email format"),
    password: Yup.string()
      .required("Password cannot be empty")
      .min(6, "at least 6 characters"),
  });
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.admins.isLoading);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    await dispatch(
      loginAdmin(values, () => {
        navigate("/admin-dashboard");
      })
    );
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {(props) => {
          const { touched, errors } = props;
          return (
            <LoginAdmin
              isLoading={isLoading}
              touched={touched}
              errors={errors}
            />
          );
        }}
      </Formik>
    </div>
  );
}

export default Login;

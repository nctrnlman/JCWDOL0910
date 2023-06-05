import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/users/userSlice";

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
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.users.isLoading);

  const handleLogin = async (values) => {
    await dispatch(
      loginUser(values, () => {
        navigate("/");
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
            <LoginForm
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

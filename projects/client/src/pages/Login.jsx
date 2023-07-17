import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import LoginUserCard from "../components/Cards/LoginUserCard";

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
  const isLoading = useSelector((state) => state.users.isLoading);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const lastVisitedPage = sessionStorage.getItem("lastVisitedPage") || "/";
    await dispatch(
      loginUser(values, () => {
        navigate(lastVisitedPage);
      })
    );
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      <LoginUserCard isLoading={isLoading} />
    </Formik>
  );
}

export default Login;

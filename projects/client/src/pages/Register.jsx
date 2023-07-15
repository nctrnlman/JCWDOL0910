import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../features/users/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterCard from "../components/Cards/RegisterCard";

function Register() {
  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email cannot be empty")
      .email("Wrong email format"),
    gender: Yup.string().required("Please select a gender"),
    first_name: Yup.string()
      .required("First name is required")
      .matches(/^[a-zA-Z\s]*$/, "Only alphabetic characters are allowed"),
    last_name: Yup.string().matches(
      /^[a-zA-Z\s]*$/,
      "Only alphabetic characters are allowed"
    ),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.users.isLoading);

  const handleRegistration = async (values) => {
    await dispatch(
      registerUser(values, () => {
        navigate("/login");
      })
    );
  };

  return (
    <Formik
      initialValues={{
        email: "",
        first_name: "",
        last_name: "",
        gender: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegistration}
    >
      <RegisterCard isLoading={isLoading} />
    </Formik>
  );
}

export default Register;

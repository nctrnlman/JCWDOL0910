import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../features/users/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import RegisterForm from "../components/Form/RegisterForm";
import { useNavigate } from "react-router-dom";

function Register() {
  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email cannot be empty")
      .email("Wrong email format"),
    gender: Yup.string().required("Please select a gender"),
    first_name: Yup.string()
      .required("First name is required")
      .matches(/^[a-zA-Z\s]*$/, "Only alphabetic characters are allowed"),
    last_name: Yup.string()
      .required("Last name is required")
      .matches(/^[a-zA-Z\s]*$/, "Only alphabetic characters are allowed"),
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
    <div>
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
        {(props) => {
          const { touched, errors } = props;
          return (
            <RegisterForm
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

export default Register;

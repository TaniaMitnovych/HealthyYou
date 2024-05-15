import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import userRoles from "../constants/UserRoles";
import TextField from "@mui/material/TextField";
import { IUser } from "../types/User";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/user";

function SignUp() {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(2).required("First name is required"),
    lastName: Yup.string().min(2).required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
    role: Yup.string()
      .oneOf(Object.values(userRoles))
      .required("Role is required"),
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setToken, updateUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const submit = (data: any) => {
    api.auth
      .signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
      })
      .then((res: any) => {
        dispatch(setUser(res.data.user));
        navigate("/info");
      });
  };
  return (
    <div className="flex justify-center items-center w-full h-screen bg-indigo-300 gradient">
      <div className="w-1/3 flex flex-col items-center bg-white p-10 rounded-md">
        <h2 className="text-3xl mb-4 text-gray-500">{t("signup.signup")}</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            role: userRoles.PATIENT,
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            submit(values);
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form className="w-full">
              <ToggleButtonGroup
                value={values.role}
                onChange={handleChange}
                aria-label="users role"
                exclusive
                className={"flex w-full"}
              >
                <ToggleButton
                  value={userRoles.PATIENT}
                  className="w-1/2"
                  name="role"
                >
                  {t("signup.patient")}
                </ToggleButton>
                <ToggleButton
                  value={userRoles.DOCTOR}
                  className="w-1/2"
                  name="role"
                >
                  {t("signup.doctor")}
                </ToggleButton>
              </ToggleButtonGroup>
              {touched.role && errors.role && <div>{errors.role}</div>}
              <div className="w-full flex flex-col gap-2 mt-4 px-2 text-red-500">
                <TextField
                  variant={"standard"}
                  fullWidth
                  placeholder={t("email")}
                  label={t("email")}
                  required
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {touched.email && errors.email && <div>{errors.email}</div>}
                <TextField
                  variant={"standard"}
                  fullWidth
                  placeholder={t("firstName")}
                  label={t("firstName")}
                  required
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                />
                {touched.firstName && errors.firstName && (
                  <div>{errors.firstName}</div>
                )}
                <TextField
                  variant={"standard"}
                  fullWidth
                  placeholder={t("lastName")}
                  label={t("lastName")}
                  required
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                />
                {touched.lastName && errors.lastName && (
                  <div>{errors.lastName}</div>
                )}
                <TextField
                  variant={"standard"}
                  fullWidth
                  placeholder={t("password")}
                  label={t("password")}
                  required
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                />
                {touched.password && errors.password && (
                  <div>{errors.password}</div>
                )}
                <TextField
                  variant={"standard"}
                  fullWidth
                  placeholder={t("confirmPassword")}
                  label={t("confirmPassword")}
                  required
                  name="passwordConfirmation"
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  type="password"
                />
                {touched.passwordConfirmation &&
                  errors.passwordConfirmation && (
                    <div>{errors.passwordConfirmation}</div>
                  )}
              </div>
              <div className="mt-6 w-full flex justify-between">
                <Button variant="outlined" onClick={() => navigate("/login")}>
                  {t("signup.haveAccount")}
                </Button>
                <Button variant="contained" type="submit">
                  {t("signup.signup")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;

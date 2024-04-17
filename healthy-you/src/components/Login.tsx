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

function LoginForm() {
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
  });
  const { t } = useTranslation();
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = (email: string, password: string) => {
    api.auth
      .login({
        email,
        password,
      })
      .then((res: any) => {
        setUser(res.data.user);
        navigate("/");
      });
  };
  return (
    <div className="flex justify-center items-center w-full h-screen bg-indigo-300">
      <div className="w-1/3 flex flex-col items-center bg-white p-10 rounded-md">
        <h2>{t("signup.login")}</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            submit(values.email, values.password);
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form className="w-full">
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
              </div>
              <div className="mt-6 w-full flex justify-between">
                <Button variant="outlined">{t("signup.haveAccount")}</Button>
                <Button variant="contained" type="submit">
                  {t("signup.login")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;

import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { setDoctor, setUser } from "../store/slices/user";
import { useDispatch } from "react-redux";
import { isDoctor } from "../utils/helpers";

function LoginForm() {
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (email: string, password: string) => {
    api.auth
      .login({
        email,
        password,
      })
      .then((res: any) => {
        dispatch(setUser(res.data.user));
        if (isDoctor(res.data.user.Role.title)) {
          navigate("/appointments");
          return api.doctors.getDoctorByUserId(res.data.user.id);
        } else {
          navigate("/");
        }
      })
      .then((res: any) => {
        if (res && res.data) {
          dispatch(setDoctor(res.data));
        }
      });
  };
  return (
    <div className="flex justify-center items-center w-full h-screen bg-indigo-300 gradient">
      <div className="w-1/3 flex flex-col items-center bg-white p-10 rounded-md">
        <h2 className="text-3xl mb-4 text-gray-500">{t("signup.login")}</h2>
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
              <div className="w-full flex flex-col gap-5 mt-4 px-2 text-red-500">
                <TextField
                  variant={"outlined"}
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
                  variant={"outlined"}
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
                <Button variant="outlined" onClick={() => navigate("/signup")}>
                  {t("signup.dontHaveAccount")}
                </Button>
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

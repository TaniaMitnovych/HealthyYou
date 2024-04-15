import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import userRoles from "../constants/UserRoles";
import TextField from "@mui/material/TextField";
import { IUser } from "../types/User";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
function LoginForm() {
  const userInitialValues: IUser = {
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: null,
    email: "",
    phoneNumber: "",
  };
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name is too short")
      .max(50, "First name is too long")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name is too short")
      .max(50, "Last name is too short")
      .required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    birthDate: Yup.date().required("Date of birth is required").nullable(),
    //phoneNumber: Yup.
  });
  const { t } = useTranslation();
  const [role, setRole] = useState<string>(userRoles.PATIENT);
  const [user, setUser] = useState<IUser | null>(null);
  const onRoleChange = (
    event: React.MouseEvent<HTMLElement>,
    newRole: string
  ) => {
    setRole(newRole);
  };
  return (
    <div className="flex justify-center items-center w-full h-screen bg-indigo-300">
      <div className="w-1/3 flex flex-col items-center bg-white p-10 rounded-md">
        <h2>{t("signup.signup")}</h2>
        <Formik initialValues={userInitialValues} onSubmit={() => {}}>
          <form className="w-full">
            <ToggleButtonGroup
              value={role}
              onChange={onRoleChange}
              aria-label="users role"
              exclusive
              className={"flex w-full"}
            >
              <ToggleButton value={userRoles.PATIENT} className="w-1/2">
                {t("signup.patient")}
              </ToggleButton>
              <ToggleButton value={userRoles.DOCTOR} className="w-1/2">
                {t("signup.doctor")}
              </ToggleButton>
            </ToggleButtonGroup>
            <div className="w-full flex flex-col gap-2 mt-4 px-2 text-red-500">
              <TextField
                variant={"standard"}
                fullWidth
                placeholder={t("firstName")}
                label={t("firstName")}
                required
                value={user?.firstName}
              />
              <TextField
                variant={"standard"}
                fullWidth
                placeholder={t("lastName")}
                label={t("lastName")}
                required
                value={user?.lastName}
              />
            </div>
            <div className="mt-6 w-full flex justify-between">
              <Button variant="outlined">{t("signup.haveAccount")}</Button>
              <Button variant="contained">{t("signup.signup")}</Button>
            </div>
          </form>
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;

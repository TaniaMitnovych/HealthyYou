import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { setUser } from "../store/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { isDoctor } from "../utils/helpers";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { t } = useTranslation();
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000-00-00"
        definitions={{
          "#": /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value: string) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
        label={t("phone")}
      />
    );
  }
);

function AdditionalInfoForm() {
  const SignupSchema = Yup.object().shape({
    sex: Yup.string().oneOf(["male", "female"]),
    phone: Yup.string(),
  });
  const { t } = useTranslation();
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const submit = (data: any) => {
    api.user
      .updateUser(
        {
          phone: data.phone,
          sex: data.sex,
          birthDate: birthDate?.toISOString(),
        },
        user?.id
      )
      .then((res: any) => {
        dispatch(setUser(res.data));
        if (isDoctor(user.role)) {
          navigate("/doctors/info");
        } else {
          navigate("/");
        }
      });
  };
  return (
    <div className="flex justify-center items-center w-full h-screen gradient">
      <div className="w-1/3 flex flex-col items-center bg-white p-10 rounded-md">
        <h2 className="text-3xl mb-4 text-gray-500">Additional info</h2>
        <Formik
          initialValues={{
            sex: "",
            phone: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            submit(values);
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form className="w-full">
              <div className="w-full flex flex-col gap-4 mt-4 px-2 text-red-500">
                <DatePicker
                  label={t("birthDate")}
                  value={birthDate}
                  onChange={setBirthDate}
                  format="DD/MM/YYYY"
                  name="birthDate"
                />
                <FormControl variant="outlined">
                  <InputLabel htmlFor="formatted-text-mask-input">
                    {t("phone")}
                  </InputLabel>
                  <OutlinedInput
                    label={t("phone")}
                    value={values.phone}
                    onChange={handleChange}
                    name="phone"
                    id="formatted-text-mask-input"
                    inputComponent={TextMaskCustom as any}
                  />
                </FormControl>
                {touched.phone && errors.phone && <div>{errors.phone}</div>}
                <FormControl fullWidth>
                  <InputLabel id="sex">{t("sex.sex")}</InputLabel>
                  <Select
                    labelId="sex"
                    id="sex"
                    value={values.sex}
                    label={t("sex.sex")}
                    name="sex"
                    onChange={handleChange}
                  >
                    <MenuItem value="male">{t("sex.male")}</MenuItem>
                    <MenuItem value="female">{t("sex.female")}</MenuItem>
                  </Select>
                </FormControl>
                {touched.sex && errors.sex && <div>{errors.sex}</div>}
              </div>
              <div className="mt-6 w-full flex justify-between px-2">
                <Button variant="outlined">Skip</Button>
                <Button variant="contained" type="submit">
                  {t("button.submit")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdditionalInfoForm;

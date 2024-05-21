import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDoctor } from "../store/slices/user";
import { toast } from "react-toastify";

function DoctorsAdditionalInfo() {
  const [experience, setExperience] = useState<string>();
  const [specialties, setSpecialties] = useState([]);
  const [specialty, setSpecialty] = useState("");
  const [description, setDescription] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    api.specialties.getSpecialties().then((res: any) => {
      setSpecialties(res.data);
    });
  }, []);
  const saveInfo = () => {
    api.doctors.updateDoctor(user.doctor.id).then((res: any) => {
      dispatch(setDoctor(res.data));
      toast.success(`Your info was updated`, {
        position: "top-right",
      });
      navigate("/appointments");
    });
  };
  return (
    <div className="flex justify-center items-center w-full h-screen gradient">
      <div className="w-1/2 flex flex-col items-center bg-white p-10 rounded-md">
        <h2 className="text-3xl mb-4 text-gray-500">Additional info</h2>
        <div className="w-full flex flex-col gap-4 mt-4 px-2 text-red-500">
          <FormControl variant="outlined">
            <InputLabel htmlFor="formatted-text-mask-input">
              Experience
            </InputLabel>
            <OutlinedInput
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              label="Experience"
              name="experience"
              id="formatted-text-mask-input"
              type="number"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="specialty">Specialty</InputLabel>
            <Select
              labelId="specialty"
              id="sex"
              label="Specialty"
              name="specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              {specialties.map((specialty: any) => {
                return (
                  <MenuItem value={specialty?.id}>{specialty?.title}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="formatted-text-mask-input">
              Description
            </InputLabel>
            <OutlinedInput
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              label="Description"
              name="description"
              id="formatted-text-mask-input"
            />
          </FormControl>
        </div>
        <div className="mt-6 w-full flex justify-between px-2">
          <Button variant="outlined" onClick={() => navigate("/appointments")}>
            Skip
          </Button>
          <Button variant="contained" type="submit" onClick={saveInfo}>
            {t("button.submit")}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default DoctorsAdditionalInfo;

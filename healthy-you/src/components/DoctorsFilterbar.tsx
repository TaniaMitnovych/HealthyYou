import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import api from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setDoctors } from "../store/slices/doctor";
import { Button, Divider, TextField, Typography } from "@mui/material";

function DoctorsFilterbar() {
  const doctors = useSelector((state: any) => state.doctors);
  const dispatch = useDispatch();

  const [specialty, setSpecialty] = useState<string>("");
  const [specialtyList, setSpecialtyList] = useState([]);
  const [doctorsList, setDoctorsList] = useState<Array<any>>(doctors);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [maxExperience, setMaxExperience] = useState<number>(70);
  const [sex, setSex] = useState<string>("");

  const handleSpecialtyChange = (event: SelectChangeEvent) => {
    setSpecialty(event.target.value as string);
  };
  const handleSexChange = (event: SelectChangeEvent) => {
    setSex(event.target.value as string);
  };
  useEffect(() => {
    api.specialties.getSpecialties().then((res) => {
      setSpecialtyList(res.data);
    });
  }, []);

  useEffect(() => {
    api.doctors
      .filterDoctors({
        specialtyId: specialty,
        minExperience,
        maxExperience,
        sex,
      })
      .then((res: any) => {
        dispatch(setDoctors(res.data));
      });
  }, [specialty, minExperience, maxExperience, sex]);

  useEffect(() => {
    setDoctorsList(doctors.doctors);
  }, [doctors]);

  const clearFilters = () => {
    setSpecialty("");
    setMinExperience(0);
    setMaxExperience(70);
    setSex("");
  };
  return (
    <section className="pt-5">
      <Typography variant="h5" display="block" gutterBottom>
        Filters
      </Typography>
      <Divider variant="middle" component="div" />
      <div className="p-4 flex flex-col gap-4">
        <div>
          <Typography variant="h6" display="block" gutterBottom>
            Specialty
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="specialty">Specialty</InputLabel>
            <Select
              labelId="specialty"
              value={specialty}
              label="Specialty"
              onChange={handleSpecialtyChange}
            >
              {specialtyList.map((specialty: any) => {
                return (
                  <MenuItem value={specialty.id} key={specialty.id}>
                    {specialty.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          <Typography variant="h6" display="block" gutterBottom>
            Experience
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              type="number"
              label="Min"
              value={minExperience}
              onChange={(e) => setMinExperience(+e.target.value)}
            />
            <TextField
              type="number"
              label="Max"
              value={maxExperience}
              onChange={(e) => setMaxExperience(+e.target.value)}
            />
          </div>
        </div>
        <div>
          <Typography variant="h6" display="block" gutterBottom>
            Sex
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="sex">Sex</InputLabel>
            <Select
              labelId="sex"
              value={sex}
              label="Sex"
              onChange={handleSexChange}
            >
              <MenuItem value="male" key="male">
                Male
              </MenuItem>
              <MenuItem value="female" key="female">
                Female
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="mt-4">
          <Button variant="contained" className="w-full" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </div>
    </section>
  );
}

export default DoctorsFilterbar;

import { useEffect, useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { throttle } from "lodash";
import api from "../api";
import PatientCard from "../components/PatientCard";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchDoctorsThrottled = throttle((query) => {
    if (query) {
      api.patients.getPatientsByName(query).then((res: any) => {
        setPatients(res.data);
      });
    }
  }, 1000);

  useEffect(() => {
    searchDoctorsThrottled(searchQuery);
  }, [searchQuery]);
  return (
    <div className="w-full min-h-full gradient">
      <div className="w-full py-5 px-10 py-10">
        <div className="flex gap-2 mb-10">
          <TextField
            placeholder="Search patients"
            value={searchQuery}
            className="w-full"
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Button variant="contained" className="h-[53px]">
            Search
          </Button>
        </div>
        {patients &&
          patients?.map?.((patient: any) => {
            return <PatientCard patient={patient} />;
          })}
      </div>
    </div>
  );
}

export default Patients;

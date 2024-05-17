import { useSelector } from "react-redux";
import DoctorsFilterbar from "../components/DoctorsFilterbar";
import DoctorCard from "../components/DoctorCard";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { throttle } from "lodash";
import api from "../api";

function Doctors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const doctors = useSelector((state: any) => state.doctors.doctors);
  console.log(doctors);
  const [doctorsList, setDoctorsList] = useState(doctors.length ? doctors : []);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") ?? ""
  );

  useEffect(() => {
    console.log(doctors);
    setDoctorsList(doctors);
  }, [doctors]);

  const searchDoctorsThrottled = throttle((query) => {
    setSearchParams({ query });
    api.doctors.filterDoctors({ name: query }).then((res: any) => {
      setDoctorsList(res.data);
    });
  }, 1000);

  useEffect(() => {
    searchDoctorsThrottled(searchQuery);
  }, [searchQuery]);
  return (
    <div className="flex w-full gap-5 gradient h-full pt-5">
      <div className="w-1/4 ml-10">
        <DoctorsFilterbar />
      </div>
      <div className="w-3/4 mr-10 mt-5">
        <div className="flex gap-2 mb-10">
          <TextField
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
        {doctorsList &&
          doctorsList?.map?.((doctor: any) => {
            return <DoctorCard doctor={doctor} />;
          })}
      </div>
    </div>
  );
}
export default Doctors;

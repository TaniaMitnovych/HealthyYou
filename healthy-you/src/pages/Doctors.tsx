import { useSelector } from "react-redux";
import DoctorsFilterbar from "../components/DoctorsFilterbar";
import DoctorCard from "../components/DoctorCard";
import { useEffect, useState } from "react";

function Doctors() {
  const doctors = useSelector((state: any) => state.doctors.doctors);
  console.log(doctors);
  const [doctorsList, setDoctorsList] = useState(doctors.length ? doctors : []);

  useEffect(() => {
    console.log(doctors);
    setDoctorsList(doctors);
  }, [doctors]);
  return (
    <div className="flex w-full gap-5">
      <div className="w-1/4 ml-10">
        <DoctorsFilterbar />
      </div>
      <div className="w-3/4 mr-10">
        {doctorsList &&
          doctorsList?.map?.((doctor: any) => {
            return <DoctorCard doctor={doctor} />;
          })}
      </div>
    </div>
  );
}
export default Doctors;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api";
import AppointmentCard from "../components/Appointments/AppointmentCard";
import dayjs from "dayjs";
import { Roles } from "../enums/Roles";

function AppointmentPage() {
  const user = useSelector((state: any) => state.user);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    console.log(user);
    if (user.role === Roles.DOCTOR) {
      api.appointments
        .getDoctorsAppointments(user.doctor.id)
        .then((res: any) => {
          setAppointments(
            res.data.sort((a: any, b: any) => {
              return dayjs(b.from).diff(dayjs(a.from));
            })
          );
          console.log(res.data);
        });
    } else {
      api.appointments.getPatientsAppointments(user.id).then((res: any) => {
        setAppointments(
          res.data.sort((a: any, b: any) => {
            return dayjs(b.from).diff(dayjs(a.from));
          })
        );
      });
    }
  }, []);
  return (
    <div className="gradient p-10 min-h-full">
      <div className="flex flex-col gap-2 ">
        {appointments.length ? (
          appointments.map((appointment: any) => {
            return (
              <AppointmentCard appointment={appointment} key={appointment.id} />
            );
          })
        ) : (
          <div className="text-center text-gray-400 mt-10">
            You have not had any appointments yet
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentPage;

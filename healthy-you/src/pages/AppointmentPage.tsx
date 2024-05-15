import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function AppointmentPage() {
  const user = useSelector((state: any) => state.user);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    console.log(user);
  });
  return (
    <div>
      <div></div>
    </div>
  );
}

export default AppointmentPage;

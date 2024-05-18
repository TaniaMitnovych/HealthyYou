import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api";
import ScheduleCard from "../components/Schedule/ScheduleCard";
import { Button } from "@mui/material";
import AddScheduleDialog from "../components/Schedule/AddScheduleDialog";

function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    api.appointments.getSchedule(user.doctor.id).then((res: any) => {
      setSchedule(res.data);
    });
  });

  return (
    <div className="gradient p-8 min-h-full">
      <div className="flex flex-col gap-4">
        <div>
          <Button variant="contained">Add schedule</Button>
        </div>
        {schedule.map((item: any) => {
          return <ScheduleCard schedule={item} />;
        })}
      </div>
      <AddScheduleDialog />
    </div>
  );
}

export default Schedule;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api";
import ScheduleCard from "../components/Schedule/ScheduleCard";
import { Button } from "@mui/material";
import AddScheduleDialog from "../components/Schedule/AddScheduleDialog";
import dayjs from "dayjs";

function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const user = useSelector((state: any) => state.user);
  const [showAddDialog, setShowAddDialog] = useState(false);
  useEffect(() => {
    api.appointments.getSchedule(user.doctor.id).then((res: any) => {
      setSchedule(
        res.data.sort((a: any, b: any) => {
          return dayjs(b.from).diff(dayjs(a.from));
        })
      );
    });
  }, []);
  const scheduleDialogClosed = async () => {
    await api.appointments.getSchedule(user.doctor.id).then((res: any) => {
      setSchedule(
        res.data.sort((a: any, b: any) => {
          return dayjs(b.from).diff(dayjs(a.from));
        })
      );
    });
    setShowAddDialog(false);
  };
  return (
    <div className="gradient p-8 min-h-full">
      <div className="flex flex-col gap-4">
        <div className="mb-3">
          <Button variant="contained" onClick={() => setShowAddDialog(true)}>
            Add schedule
          </Button>
        </div>
        {schedule.length ? (
          schedule.map((item: any) => {
            return <ScheduleCard schedule={item} />;
          })
        ) : (
          <div className="text-center text-gray-400 mt-10">
            You have not had any schedule notes yet
          </div>
        )}
      </div>
      {showAddDialog && <AddScheduleDialog close={scheduleDialogClosed} />}
    </div>
  );
}

export default Schedule;

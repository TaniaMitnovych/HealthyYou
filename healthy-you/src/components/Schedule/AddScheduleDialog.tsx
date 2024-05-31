import { Button, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api";

function AddScheduleDialog({ close }: { close: () => void }) {
  const user = useSelector((state: any) => state.user);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [from, setFrom] = useState<Dayjs | null>(null);
  const [to, setTo] = useState<Dayjs | null>(null);
  const [appointmentDuration, setAppointmentDuration] = useState(20);
  useEffect(() => {
    setFrom(dayjs(date).startOf("day"));
    setTo(dayjs(date).endOf("day"));
  }, [date]);

  const addSchedule = async () => {
    await api.appointments.createSchedule({
      from,
      to,
      doctorId: user.doctor.id,
      appointmentDuration,
    });
    close();
  };

  return (
    <div className="absolute w-screen h-screen bg-black bg-opacity-75 z-[100] top-0 left-0 flex justify-center items-center">
      <div className="w-1/2 bg-white rounded-3xl h-3/4 p-8 box-border relative">
        <h2 className="font-bold tracking-wider text-2xl ml-4 mb-6">
          Add Schedule
        </h2>
        <div className="flex flex-col gap-4">
          <DatePicker
            label="Date"
            value={date}
            onChange={setDate}
            format="DD/MM/YYYY"
          />
          <TimePicker
            ampm={false}
            value={from}
            onChange={setFrom}
            label="From time"
          />
          <TimePicker
            ampm={false}
            value={to}
            onChange={setTo}
            label="To time"
          />
          <TextField
            label="AppointmentDuration"
            type="number"
            value={appointmentDuration}
            onChange={(e) => setAppointmentDuration(+e.target.value)}
          />
        </div>
        <div className="absolute bottom-0 mb-8 flex justify-end gap-4 right-8">
          <Button onClick={close}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!(from && to && date && appointmentDuration)}
            onClick={addSchedule}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
export default AddScheduleDialog;

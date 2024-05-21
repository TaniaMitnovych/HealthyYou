import { useEffect, useState } from "react";
import api from "../../api";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function MakeAppointmentDialog({
  doctor,
  onCancel,
}: {
  doctor: any;
  onCancel: () => void;
}) {
  const user = useSelector((state: any) => state.user);
  const [currentDate, setCuttentDate] = useState("2024-05-21T07:00:00.000Z");
  const [schedule, setSchedule] = useState([
    {
      from: "",
      to: "",
      appointmentDuration: 20,
    },
  ]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDateTime, setSelected] = useState({
    value: "",
    time: "",
    available: false,
  });
  const [appointmentList, setAppointmentList] = useState<any[]>([]);

  useEffect(() => {
    api.appointments
      .getScheduleWithAppointments(
        doctor.id,
        dayjs(currentDate).startOf("day").toISOString(),
        dayjs(currentDate).endOf("day").toISOString()
      )
      .then((res: any) => {
        setSchedule(res.data.schedule);
        setAppointments(res.data.appointments);
      });
  }, [currentDate]);

  useEffect(() => {
    const list = getAppointmentList(schedule?.[0]);
    setAppointmentList(list);
  }, [schedule]);
  const getAppointmentList = (schedule: any) => {
    const list: any[] = [];
    if (schedule) {
      let scheduleStart = dayjs(schedule.from);
      const scheduleEnd = dayjs(schedule.to);
      while (scheduleEnd >= scheduleStart) {
        list.push({
          value: scheduleStart.toISOString(),
          time: scheduleStart.format("HH:mm"),
          available: true,
        });
        scheduleStart = scheduleStart.add(
          schedule.appointmentDuration,
          "minute"
        );
      }
      appointments.map((appointment: any) => {
        const timeIndex = list.findIndex(
          (item: any) => item.time === dayjs(appointment.from).format("HH:mm")
        );
        console.log(timeIndex);
        if (timeIndex) {
          list[timeIndex].available = false;
        }
      });
    }
    return list;
  };

  const makeAppointment = () => {
    api.appointments
      .createAppointment({
        doctorId: doctor.id,
        patientId: user.id,
        from: selectedDateTime.value,
        to: dayjs(selectedDateTime.value)
          .add(schedule?.[0]?.appointmentDuration, "minute")
          .toISOString(),
      })
      .then(() => {
        toast.success(`New appointment was creared`, {
          position: "top-right",
        });
      });
    onCancel();
  };

  return (
    <div className="absolute w-full h-full bg-black bg-opacity-75 z-[100] top-0 left-0 flex justify-center items-center">
      <div className="w-2/3 bg-white rounded-3xl h-3/4 p-8 box-border relative">
        <h2 className="font-bold tracking-wider text-2xl ml-4 mb-6">
          Appointments
        </h2>
        <div className="flex h-[90%] box-border items-stretch">
          <div className="h-5/6 w-1/2">
            <div className="flex justify-between mb-3 px-4 pr-8">
              <Button
                variant="outlined"
                onClick={() =>
                  setCuttentDate((prev: string) =>
                    dayjs(prev).subtract(1, "day").toISOString()
                  )
                }
              >
                <ArrowLeftIcon />
              </Button>
              <div className="h-10 leading-10">
                {dayjs(currentDate).format("DD MMMM, YYYY")}
              </div>
              <Button
                variant="outlined"
                onClick={() =>
                  setCuttentDate((prev: string) =>
                    dayjs(prev).add(1, "day").toISOString()
                  )
                }
              >
                <ArrowRightIcon />
              </Button>
            </div>
            <div className="flex flex-col gap-2  overflow-y-scroll h-full">
              {appointmentList.length ? (
                appointmentList.map((app: any) => {
                  return (
                    <div
                      className={`p-4 rounded-2xl text-center font-bold ${app.available ? "bg-blue-700 text-white hover:bg-blue-900 cursor-pointer" : "bg-gray-200 text-white pointer-events-none"}`}
                      onClick={() => setSelected(app)}
                    >
                      {app.time}
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-400">
                  There are no available slots
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between h-5/6 w-1/2">
            {selectedDateTime && (
              <div className="flex flex-col justify-center text-center">
                <div className="text-lg">Doctor</div>
                <div className="text-2xl">
                  {`${doctor.User.firstName} ${doctor.User.lastName}`}
                </div>
                <div className="text-gray-500 text-sm">
                  {doctor.Specialty.title}
                </div>
                <div className="text-lg mt-4">Appointment</div>
                {selectedDateTime.value ? (
                  <div className="font-bold text-lg">
                    <div>
                      {dayjs(selectedDateTime.value).format(
                        "dddd, DD MMMM, YYYY"
                      )}
                    </div>
                    <div>{selectedDateTime.time}</div>
                  </div>
                ) : (
                  <div>-</div>
                )}
              </div>
            )}
            <div className="absolute bottom-5 right-8 flex justify-end gap-3">
              <Button variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={!selectedDateTime.value}
                onClick={makeAppointment}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeAppointmentDialog;

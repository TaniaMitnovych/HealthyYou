import dayjs from "dayjs";

function ScheduleCard({ schedule }: { schedule: any }) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 flex justify-evenly text-center">
      <div>
        <div className="text-sm border-b">Date</div>
        <div className="text-xl mt-4 text-blue-800">
          {dayjs(schedule.from).format("DD.MM.YYYY")}
        </div>
      </div>
      <div>
        <div className="text-sm border-b">Time</div>
        <div className="text-xl mt-4 text-blue-800">{`${dayjs(schedule.from).format("HH:mm")} - ${dayjs(schedule.to).format("HH:mm")}`}</div>
      </div>
      <div>
        <div className="text-sm border-b">Appointment duration</div>
        <div className="text-xl mt-4 text-blue-800">{`${schedule.appointmentDuration} min`}</div>
      </div>
    </div>
  );
}
export default ScheduleCard;

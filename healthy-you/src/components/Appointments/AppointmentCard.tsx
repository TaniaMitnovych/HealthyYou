import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Roles } from "../../enums/Roles";

function AppointmentCard({ appointment }: { appointment: any }) {
  const user = useSelector((state: any) => state.user);

  const isActive = (date: string) => {
    return dayjs(date).isAfter(dayjs());
  };
  const getFullName = () => {
    if (user.role === Roles.DOCTOR) {
      return `${appointment.User.firstName} ${appointment.User.lastName}`;
    }
    return `${appointment.Doctor.User.firstName} ${appointment.Doctor.User.lastName}`;
  };
  return (
    <div className="bg-gray-100 px-8 py-6 drop-shadow-xl flex justify-between rounded-xl">
      <div>
        <div className="text-xl">{getFullName()}</div>
        <div>
          {isActive(appointment.from) ? (
            <span className="text-green-500">Active</span>
          ) : (
            <span className="text-red-500">Inactive</span>
          )}
        </div>
      </div>
      <div>
        <div className="text-center font-semibold">
          {dayjs(appointment.from).format("HH:mm")} -{" "}
          {dayjs(appointment.to).format("HH:mm")}
        </div>
        <div className="text-center text-sm">
          {dayjs(appointment.from).format("DD.MM.YYYY")}
        </div>
      </div>
    </div>
  );
}
export default AppointmentCard;

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MakeAppointmentDialog from "./Appointments/MakeAppointmentDialog";
import { useState } from "react";

function DoctorCard({ doctor }: { doctor: any }) {
  const [showMakeAppointmentDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="px-8 pt-8 pb-4 bg-gray-100 my-4 rounded-3xl shadow-md">
      <div className="text-2xl">
        {`${doctor.User.firstName} ${doctor.User.lastName}`}
        <span className="text-gray-500 text-base ml-3">
          {doctor?.Specialty?.title}
        </span>
      </div>

      {doctor.User.sex && (
        <div className="ml-2 text-gray-500 text-sm">{doctor.User.sex}</div>
      )}
      {doctor.description && <div className="my-2">{doctor.description}</div>}
      <div className="flex gap-4 w-full justify-end">
        <Button variant="contained" onClick={() => setShowDialog(true)}>
          Make an appointment
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(`/chat/${doctor.User.id}`)}
        >
          Send Message
        </Button>
      </div>
      {showMakeAppointmentDialog && (
        <MakeAppointmentDialog
          doctor={doctor}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}

export default DoctorCard;

import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function PatientCard({ patient }: { patient: any }) {
  const navigate = useNavigate();

  return (
    <div className="px-8 py-8 pb-4 bg-gray-100 my-4 rounded-3xl shadow-md flex justify-between">
      <div>
        <div className="text-2xl">
          {`${patient.firstName} ${patient.lastName}`}
          {patient.sex && (
            <span className="ml-2 text-gray-500 text-sm">{patient.sex}</span>
          )}
        </div>
        <div>
          {patient.birthDate && (
            <div>B-day: {dayjs(patient.birthDate).format("DD.MM.YYYY")}</div>
          )}
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={() => navigate(`/chat/${patient.id}`)}
          className="h-fit"
        >
          Send Message
        </Button>
      </div>
    </div>
  );
}
export default PatientCard;

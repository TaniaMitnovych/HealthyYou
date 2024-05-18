import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

function AddScheduleDialog() {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <div className="absolute w-screen h-screen bg-black bg-opacity-75 z-[100] top-0 left-0 flex justify-center items-center">
      <div className="w-2/3 bg-white rounded-3xl h-3/4 p-8 box-border relative">
        <DatePicker
          label="Date"
          value={date}
          onChange={setDate}
          format="DD/MM/YYYY"
        />
      </div>
    </div>
  );
}
export default AddScheduleDialog;

import axios from "axios";

function getScheduleWithAppointments(
  doctorId: string,
  from: string,
  to: string
) {
  return axios.get("/schedule", {
    params: { doctorId, from, to },
  });
}

function createAppointment(payload: any) {
  return axios.post("/appointment", {
    ...payload,
  });
}
export default {
  getScheduleWithAppointments,
  createAppointment,
};

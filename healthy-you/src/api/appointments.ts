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

function getDoctorsAppointments(id: string) {
  return axios.get(`/appointment/doctor/${id}`);
}
function getPatientsAppointments(id: string) {
  return axios.get(`/appointment/patient/${id}`);
}
function getSchedule(doctorId: string) {
  return axios.get(`/schedule/${doctorId}`);
}
export default {
  getScheduleWithAppointments,
  createAppointment,
  getDoctorsAppointments,
  getPatientsAppointments,
  getSchedule,
};

import axios from "axios";

function filterDoctors(filters: any) {
  return axios.get(`/doctor`, {
    params: filters,
  });
}
function getDoctorByUserId(id: string) {
  return axios.get(`/doctor/${id}`);
}

export default {
  filterDoctors,
  getDoctorByUserId,
};

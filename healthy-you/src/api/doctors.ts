import axios from "axios";

function filterDoctors(filters: any) {
  return axios.get(`/doctor`, {
    params: filters,
  });
}

export default {
  filterDoctors,
};

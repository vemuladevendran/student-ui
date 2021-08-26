import axios from "axios";

export const createMarks = (data) => {
  return axios.post(`http://localhost:3000/api/v1/marks`, data);
};

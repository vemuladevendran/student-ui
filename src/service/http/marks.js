import axios from "axios";

export const createMarks = (data) => {
  return axios.post(`http://localhost:3000/api/v1/marks`, data);
};

export const getMarks = (filterDetails) => {
  return axios.get(`http://localhost:3000/api/v1/marks`, {
    params: filterDetails,
  });
}


export const deleteMarks = (id) => {
  return axios.delete(`http://localhost:3000/api/v1/marks/${id}`)
}
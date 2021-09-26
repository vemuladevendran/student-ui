import axios from "axios";

const urlPort = "https://studentmanagmentdb.herokuapp.com/api/v1";
// const urlPort = 'http://localhost:5000/api/v1'

export const createMarks = (data) => {
  return axios.post(`${urlPort}/marks`, data);
};

export const getMarks = (filterDetails) => {
  return axios.get(`${urlPort}/marks`, {
    params: filterDetails,
  });
}


export const deleteMarks = (id) => {
  return axios.delete(`${urlPort}/marks/${id}`)
}
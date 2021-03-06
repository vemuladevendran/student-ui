import axios from "axios";

const urlPort = "https://api.pecstudents.engineer/api/v1";
// const urlPort = "https://studentmanagmentdb.herokuapp.com/api/v1";
// const urlPort = 'http://localhost:5000/api/v1'

export const createMarks = (data, queryDetails) => {
  return axios.post(`${urlPort}/marks`, data, { params: queryDetails });
};

export const getMarks = (filterDetails) => {
  return axios.get(`${urlPort}/marks`, {
    params: filterDetails,
  });
}


export const deleteMarks = (id) => {
  return axios.delete(`${urlPort}/marks/${id}`)
}
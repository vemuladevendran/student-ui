import axios from "axios";
const urlPort = "https://api.pecstudents.engineer/api/v1";
// const urlPort = "https://studentmanagmentdb.herokuapp.com/api/v1";
// const urlPort = 'http://localhost:5000/api/v1'

export const login = (data) => {
  return axios.post(`${urlPort}/login`, data);
};

import axios from "axios";

const urlPort = "https://studentmanagmentdb.herokuapp.com/api/v1";
// const urlPort = 'http://localhost:5000/api/v1'

export const getStudents = (filterDetails) => {
  return axios.get(`${urlPort}/student`, {
    params: filterDetails,
  });
};

export const createStudents = (id, data) => {
  return axios.post(`${urlPort}/student/${id}`, data);
};

export const updateStudent = (id, data) => {
  return axios.put(`${urlPort}/student/${id}`, data);
};

export const getStudentById = (id) => {
  return axios.get(`${urlPort}/student/${id}`);
};

export const deleteStudent = (id) => {
  return axios.delete(`${urlPort}/student/${id}`);
};


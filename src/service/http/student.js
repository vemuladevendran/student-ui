import axios from "axios";

const urlPort = 'https://studentmanagmentdb.herokuapp.com/api/v1'
// const urlPort = 'http://localhost:5000/api/v1'


export const getStudents = (filterDetails) => {
  return axios.get(`${urlPort}/v1/student`, {
    params: filterDetails,
  });
};

export const createStudents = () => {
  return axios.post(`${urlPort}/v1/student/student`);
};

export const getStudentById = (id) => {
  return axios.get(`${urlPort}/v1/student/student/${id}`);
};

export const deleteStudent = (id) => {
  return axios.delete(`${urlPort}/v1/student/student/${id}`);
}
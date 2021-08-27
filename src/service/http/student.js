import axios from "axios";

export const getStudents = (filterDetails) => {
  return axios.get(`http://localhost:5000/api/v1/student`, {
    params: filterDetails,
  });
};

export const createStudents = () => {
  return axios.post(`http://localhost:5000/api/v1/student`);
};

export const getStudentById = (id) => {
  return axios.get(`http://localhost:5000/api/v1/student/${id}`);
};

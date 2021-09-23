import axios from "axios";

const urlPort = "https://studentmanagmentdb.herokuapp.com/api/v1";
// const urlPort = 'http://localhost:5000/api/v1'

export const getCirculars = () => {
  return axios.get(`${urlPort}/circular`);
};

export const createCirculars = (data, queryDetails) => {
  return axios.post(`${urlPort}/circular`, data, { params: queryDetails });
};


export const deleteCircular = (id) => {
  return axios.delete(`${urlPort}/circular/${id}`);
};
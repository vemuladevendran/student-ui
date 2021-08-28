import axios from "axios";

const urlPort = 'https://studentmanagmentdb.herokuapp.com/api/v1'
// const urlPort = 'http://localhost:5000/api/v1'

export const getReports = () => {
    return(axios.get(`${urlPort}/report`));
}

export const createReports = (data, queryDetails) => {
    return axios.post(`${urlPort}/report`, data, { params: queryDetails });
  };
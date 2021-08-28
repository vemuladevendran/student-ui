import axios from "axios";

const urlPort = "https://studentmanagmentdb.herokuapp.com/api/v1";
// const urlPort = 'http://localhost:5000/api/v1'

export const updatePassword = (userId, data) => {
  return axios.post(`${urlPort}/updatepassword/${userId}`, data);
};

export const forgetPassword = (data) => {
return axios.post(`${urlPort}/forgetpassword`, data)
}

export const verifyForgetPassword = (id, otp, data) => {
    return axios.post(`${urlPort}/verifyforgetpassword/${id}/${otp}`, data)
}


import axios from "axios"

const urlPort = "https://api.pecstudents.engineer/api/v1";
// const urlPort = "https://studentmanagmentdb.herokuapp.com/api/v1";
// const urlPort = 'http://localhost:5000/api/v1'

export const getUsers = () => {
    return (axios.get(`${urlPort}/users`));
}

export const createUser = (data) => {
     return(axios.post(`${urlPort}/users`, data))

}

export const getUserById = (id) => {
    return(axios.get(`${urlPort}/users/${id}`))
}

export const deleteUser = (id) =>{
return(axios.delete(`${urlPort}/users/${id}`))
}


import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://aics-attend.onrender.com/api",
    withCredentials:true,
})
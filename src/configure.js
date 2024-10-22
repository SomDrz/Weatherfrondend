import axios from "axios"
export const axiosInstance = axios.create({
    baseURL :  "https://searchdozbackend.onrender.com/api/"
})
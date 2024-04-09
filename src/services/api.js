import axios from "axios"

export const api = axios.create({
  baseURL: "https://rocketmovies-back-009v.onrender.com",
})

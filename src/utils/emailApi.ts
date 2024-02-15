import axios from "axios";
export const emailApi = axios.create({
  baseURL: "https://api.emailjs.com/api/v1.0",
  headers: {
    "Content-Type": "application/json",
    origin: "http://localhost",
  },
});

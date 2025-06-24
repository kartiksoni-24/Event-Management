import axios from "axios";

const API = axios.create({
  baseURL: "https://event-management-hwg6.onrender.com/api",
  // baseURL: "http://localhost:8080/api",
});

export default API;

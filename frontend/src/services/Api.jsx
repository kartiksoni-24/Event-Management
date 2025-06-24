import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // Adjust if you use a different port
});

export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "https://event-management-hwg6.onrender.com/api",
});

export default API;

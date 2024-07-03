import axios from "axios";

const http = axios.create({
  baseURL: "https://api.healinggarden.co.in/api",
});

export default http;


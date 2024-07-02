import axios from "axios";

const http = axios.create({
  baseURL: "http://api.healinggarden.co.in/api",
});

export default http;


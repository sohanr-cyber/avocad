import axios from "axios";

const token = JSON.parse(localStorage.getItem("userInfo"));

const instance = axios.create({
  baseURL: "/",
  timeout: 1000,
  headers: { Authorization: `Bearer ${token}` },
});

export default instance;

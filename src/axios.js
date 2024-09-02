import axios from "axios";

const localUrl = "http://localhost:7001";
const prodUrl = "https://cm-backend-l4xg.onrender.com";

const axiosnew = axios.create({
  baseURL: prodUrl,
});

export default axiosnew;

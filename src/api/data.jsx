const token = import.meta.env.VITE_GITHUB_TOKEN;
const options = { headers: { Authorization: `Bearer ${token}` } };

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: options.headers,
});

export default api;

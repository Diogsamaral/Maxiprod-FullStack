import axios from "axios";

// Cria uma instancia de axios com a URL base para a API
const api = axios.create({
  baseURL: "http://localhost:5232/api",
});

export default api;

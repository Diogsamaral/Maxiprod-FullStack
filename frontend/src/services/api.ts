import axios from "axios";

const api = axios.create({
  // Se existir uma variável de ambiente, usa ela.
  // Se não existir (estiver rodando local), usa o localhost.
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5232/api",
});

export default api;

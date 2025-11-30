import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', //poner la 'http://156.35.98.53:3001/api' para la MV
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // ajuste se seu backend estiver rodando em outra porta
});

// Adiciona automaticamente o token JWT nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

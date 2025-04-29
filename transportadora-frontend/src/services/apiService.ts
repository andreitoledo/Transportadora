// src/services/apiService.ts

// Mock de dados

const pedidosMock = [
    { id: 1, tipoEntrega: 'NORMAL', valor: 2500 },
    { id: 2, tipoEntrega: 'URGENTE', valor: 5000 },
    { id: 3, tipoEntrega: 'NORMAL', valor: 1800 },
    { id: 4, tipoEntrega: 'URGENTE', valor: 3200 },
    { id: 5, tipoEntrega: 'NORMAL', valor: 1000 },
  ];
  
  const clientesMock = [
    { id: 1, nome: 'Empresa A' },
    { id: 2, nome: 'Empresa B' },
    { id: 3, nome: 'Empresa C' },
  ];
  
  // Simula um atraso de rede para ficar realista
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  export const getPedidos = async () => {
    await delay(500); // 0.5 segundos
    return pedidosMock;
  };
  
  export const getClientes = async () => {
    await delay(500); // 0.5 segundos
    return clientesMock;
  };
  
  import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // ou ajuste se sua API mudar
});

// Motoristas
export const getMotoristas = async () => {
  const response = await api.get('/motoristas');
  return response.data;
};

export const createMotorista = async (data: any) => {
  const response = await api.post('/motoristas', data);
  return response.data;
};

export const updateMotorista = async (id: string, data: any) => {
  const response = await api.patch(`/motoristas/${id}`, data);
  return response.data;
};

export const deleteMotorista = async (id: string) => {
  const response = await api.delete(`/motoristas/${id}`);
  return response.data;
};
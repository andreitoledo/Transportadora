// src/services/MotoristaService.ts

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';

export interface Motorista {
  id?: string;
  nome: string;
  cpf?: string; // opcional para salvar, mas necessário no backend
  cnh: string;
  telefone: string;
  email?: string;
  validadeCnh?: string; // formato ISO string
  status?: boolean;
}

export const MotoristaService = {
  async getAll(): Promise<Motorista[]> {
    const response = await axios.get(`${BASE_URL}/motoristas`);
    return response.data.data; // lembre que agora vem dentro do { success, data }
  },

  async create(data: Motorista): Promise<Motorista> {
    const response = await axios.post(`${BASE_URL}/motoristas`, data);
    return response.data.data;
  },

  async update(id: string, data: Motorista): Promise<Motorista> {
    const response = await axios.patch(`${BASE_URL}/motoristas/${id}`, data);
    return response.data.data;
  },

  async remove(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/motoristas/${id}`);
  }
};

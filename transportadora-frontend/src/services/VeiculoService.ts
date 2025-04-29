import { api } from './apiService';

export interface Veiculo {
  id?: string;
  placa: string;
  modelo: string;
  marca: string;
  ano: number;
  capacidadeKg: number;
  tipo: string;
}

export const VeiculoService = {
  async getAll(): Promise<Veiculo[]> {
    const response = await api.get('/api/v1/veiculos');
    return response.data.data;
  },

  async create(data: Veiculo): Promise<Veiculo> {
    const response = await api.post('/api/v1/veiculos', data);
    return response.data.data;
  },

  async update(id: string, data: Veiculo): Promise<Veiculo> {
    const response = await api.patch(`/api/v1/veiculos/${id}`, data);
    return response.data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/api/v1/veiculos/${id}`);
  }
};

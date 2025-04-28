import { api } from './api';

export class ClienteService {
  static async listar() {
    const response = await api.get('/clientes');
    return response.data;
  }

  static async criar(cliente: any) {
    const response = await api.post('/clientes', cliente);
    return response.data;
  }

  static async atualizar(id: string, cliente: any) {
    const response = await api.put(`/clientes/${id}`, cliente);
    return response.data;
  }

  static async excluir(id: string) {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
  }
}

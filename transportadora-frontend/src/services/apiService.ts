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
  
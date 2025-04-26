export class Veiculo {
    id: string;
    placa: string;
    modelo: string;
    marca: string;
    ano: number;
    capacidadeKg: number;
    tipo: 'CAMINHAO' | 'VAN' | 'CARRETA' | 'UTILITARIO';
    createdAt: Date;
    updatedAt: Date;
  }
  
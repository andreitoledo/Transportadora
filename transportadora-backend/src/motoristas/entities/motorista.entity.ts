import { CategoriaCnh } from '@prisma/client';

export class Motorista {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email?: string;
  categoriaCnh: CategoriaCnh;
  numeroCnh: string;
  validadeCnh: Date;
  createdAt: Date;
  updatedAt: Date;
}

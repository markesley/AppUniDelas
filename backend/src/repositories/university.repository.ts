import { prisma } from '../database/prisma-client';
import { CreateUniversidadeDTO, UniversidadeResponseDTO } from '../interfaces/university.dto';

export class UniversidadeRepository {
  async create(data: CreateUniversidadeDTO): Promise<UniversidadeResponseDTO> {
    const universidade = await prisma.universidade.create({
      data,
    });

    return {
      id: universidade.id,
      nome: universidade.nome,
      cidade: universidade.cidade,
      estado: universidade.estado,
      endereco: universidade.endereco,
      contatoSeguranca: universidade.contatoSeguranca || undefined,
      contatoOuvidoria: universidade.contatoOuvidoria || undefined,
    //   createdAt: new Date(), // Simulação, pois o schema não tem `createdAt`
    };
  }

  async findAll(): Promise<UniversidadeResponseDTO[]> {
    const universidades = await prisma.universidade.findMany();
    return universidades.map((universidade) => ({
      id: universidade.id,
      nome: universidade.nome,
      cidade: universidade.cidade,
      estado: universidade.estado,
      endereco: universidade.endereco,
      contatoSeguranca: universidade.contatoSeguranca || undefined,
      contatoOuvidoria: universidade.contatoOuvidoria || undefined,
    //   createdAt: new Date(),
    }));
  }
}
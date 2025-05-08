import { prisma } from '../database/prisma-client';
import { CreateAcessoRecursoDTO } from '../interfaces/resourceAccess.dto';

export class AcessoRecursoRepository {
  async create(data: CreateAcessoRecursoDTO) {
    return prisma.acessoRecurso.create({ data });
  }

  async findAll() {
    return prisma.acessoRecurso.findMany();
  }

  async findByUserId(usuarioId: string) {
    return prisma.acessoRecurso.findMany({ where: { usuarioId } });
  }

  async delete(usuarioId: string, recursoId: string) {
    return prisma.acessoRecurso.delete({
      where: { usuarioId_recursoId: { usuarioId, recursoId } },
    });
  }
}

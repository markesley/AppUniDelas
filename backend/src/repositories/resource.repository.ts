import { prisma } from '../database/prisma-client';
import { CreateRecursoDTO } from '../interfaces/resource.dto';

export class RecursoRepository {
  async create(data: CreateRecursoDTO) {
    return prisma.recurso.create({ data });
  }

  async findAll() {
    return prisma.recurso.findMany();
  }

  async findById(id: string) {
    return prisma.recurso.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<CreateRecursoDTO>) {
    return prisma.recurso.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.recurso.delete({ where: { id } });
  }
}

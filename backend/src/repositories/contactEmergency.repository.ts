import { prisma } from "../database/prisma-client";
import { CreateContatoEmergenciaDTO } from '../interfaces/contactEmergency.dto';

export class ContatoEmergenciaRepository {
  async create(data: CreateContatoEmergenciaDTO) {
    return prisma.contatoEmergencia.create({ data });
  }

  async findAll() {
    return prisma.contatoEmergencia.findMany();
  }

  async findById(id: string) {
    return prisma.contatoEmergencia.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<CreateContatoEmergenciaDTO>) {
    return prisma.contatoEmergencia.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.contatoEmergencia.delete({ where: { id } });
  }
}

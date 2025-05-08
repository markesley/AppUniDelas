import { prisma } from "../database/prisma-client";
import { CreateContatoConfiancaDTO } from '../interfaces/contactTrust.dto';

export class ContatoConfiancaRepository {
  async create(data: CreateContatoConfiancaDTO) {
    return prisma.contatoConfianca.create({ data });
  }

  async findAll() {
    return prisma.contatoConfianca.findMany();
  }

  async findById(id: string) {
    return prisma.contatoConfianca.findUnique({ where: { id } });
  }

  async findByUsuario(usuarioId: string) {
    return prisma.contatoConfianca.findMany({ where: { usuarioId } });
  }

  async update(id: string, data: Partial<CreateContatoConfiancaDTO>) {
    return prisma.contatoConfianca.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.contatoConfianca.delete({ where: { id } });
  }
}

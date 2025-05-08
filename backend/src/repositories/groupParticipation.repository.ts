import { prisma } from "../database/prisma-client";
import { CreateParticipacaoGrupoDTO } from '../interfaces/groupParticipation.dto';

export class ParticipacaoGrupoRepository {
  async create(data: CreateParticipacaoGrupoDTO) {
    return prisma.participacaoGrupo.create({ data });
  }

  async findByGrupo(grupoId: string) {
    return prisma.participacaoGrupo.findMany({
      where: { grupoId },
      include: { usuario: true },
    });
  }

  async findByUsuario(usuarioId: string) {
    return prisma.participacaoGrupo.findMany({
      where: { usuarioId },
      include: { grupo: true },
    });
  }

  async delete(usuarioId: string, grupoId: string) {
    return prisma.participacaoGrupo.delete({
      where: {
        usuarioId_grupoId: {
          usuarioId,
          grupoId,
        },
      },
    });
  }
}

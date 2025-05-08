import { prisma } from '../database/prisma-client';
import { CreateGrupoApoioDTO, GrupoApoioResponseDTO } from '../interfaces/group.dto';

export class GrupoApoioRepository {
  async create(data: CreateGrupoApoioDTO): Promise<GrupoApoioResponseDTO> {
    const grupo = await prisma.grupoApoio.create({
      data,
    });

    return {
      id: grupo.id,
      nome: grupo.nome,
      descricao: grupo.descricao,
      local: grupo.local || undefined,
      horario: grupo.horario || undefined,
      diaSemana: grupo.diaSemana || undefined,
      universidadeId: grupo.universidadeId,
      imagem: grupo.imagem || undefined,
      contatoResponsavel: grupo.contatoResponsavel || undefined,
    };
  }

  async findAll(): Promise<GrupoApoioResponseDTO[]> {
    const grupos = await prisma.grupoApoio.findMany();
    return grupos.map((grupo) => ({
      id: grupo.id,
      nome: grupo.nome,
      descricao: grupo.descricao,
      local: grupo.local || undefined,
      horario: grupo.horario || undefined,
      diaSemana: grupo.diaSemana || undefined,
      universidadeId: grupo.universidadeId,
      imagem: grupo.imagem || undefined,
      contatoResponsavel: grupo.contatoResponsavel || undefined,
    }));
  }

  async findById(id: string): Promise<GrupoApoioResponseDTO | null> {
    const grupo = await prisma.grupoApoio.findUnique({
      where: { id },
    });

    if (!grupo) return null;

    return {
      id: grupo.id,
      nome: grupo.nome,
      descricao: grupo.descricao,
      local: grupo.local || undefined,
      horario: grupo.horario || undefined,
      diaSemana: grupo.diaSemana || undefined,
      universidadeId: grupo.universidadeId,
      imagem: grupo.imagem || undefined,
      contatoResponsavel: grupo.contatoResponsavel || undefined,
    };
  }

  async delete(id: string): Promise<void> {
    await prisma.grupoApoio.delete({
      where: { id },
    });
  }

  async findByUniversidade(universidadeId: string): Promise<GrupoApoioResponseDTO[]> {
    const grupos = await prisma.grupoApoio.findMany({
      where: { universidadeId },
    })
    return grupos.map(grupo => ({
      id: grupo.id,
      nome: grupo.nome,
      descricao: grupo.descricao,
      local: grupo.local || undefined,
      horario: grupo.horario || undefined,
      diaSemana: grupo.diaSemana || undefined,
      universidadeId: grupo.universidadeId,
      imagem: grupo.imagem || undefined,
      contatoResponsavel: grupo.contatoResponsavel || undefined,
    }))
  }
}
import { prisma } from "../database/prisma-client";
import { CurtidaDTO, CurtidaResponseDTO } from "../interfaces/like.dto";

export class CurtidaRepository {
  async curtirPost(data: CurtidaDTO): Promise<CurtidaResponseDTO> {
    // Verifica se já existe uma curtida para esse par usuário-post
    const curtidaExistente = await prisma.curtida.findUnique({
      where: {
        usuarioId_postId: {
          usuarioId: data.usuarioId,
          postId: data.postId,
        },
      },
    });

    if (curtidaExistente) {
      // Se já curtiu, retorne a curtida existente (ou você pode lançar um erro)
      return curtidaExistente;
    }

    return await prisma.curtida.create({
      data,
    });
  }

  
  async descurtirPost(usuarioId: string, postId: string): Promise<void> {
    await prisma.curtida.delete({
      where: {
        usuarioId_postId: { usuarioId, postId },
      },
    });
  }

  async getCurtidasByPostId(postId: string): Promise<CurtidaResponseDTO[]> {
    return await prisma.curtida.findMany({
      where: { postId },
    });
  }

  async getCurtidasByUsuarioId(usuarioId: string): Promise<CurtidaResponseDTO[]> {
    return await prisma.curtida.findMany({
      where: { usuarioId },
    });
  }

  async countCurtidasByPostId(postId: string): Promise<number> {
    return await prisma.curtida.count({
      where: { postId },
    });
  }
}

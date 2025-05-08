import { prisma } from "../database/prisma-client";
import { CreateComentarioDTO, ComentarioResponseDTO } from "../interfaces/comment.dto";

export class ComentarioRepository {
  async create(data: CreateComentarioDTO): Promise<ComentarioResponseDTO> {
    const comentario = await prisma.comentario.create({ data });

    return {
      id: comentario.id,
      postId: comentario.postId,
      usuarioId: comentario.usuarioId,
      conteudo: comentario.conteudo,
      dataComentario: comentario.dataComentario,
      visibilidade: comentario.visibilidade,
      status: comentario.status,
    };
  }

  async findAll(): Promise<ComentarioResponseDTO[]> {
    const comentarios = await prisma.comentario.findMany();

    return comentarios.map((comentario) => ({
      id: comentario.id,
      postId: comentario.postId,
      usuarioId: comentario.usuarioId,
      conteudo: comentario.conteudo,
      dataComentario: comentario.dataComentario,
      visibilidade: comentario.visibilidade,
      status: comentario.status,
    }));
  }

  async findById(id: string): Promise<ComentarioResponseDTO | null> {
    const comentario = await prisma.comentario.findUnique({ where: { id } });
    if (!comentario) return null;

    return {
      id: comentario.id,
      postId: comentario.postId,
      usuarioId: comentario.usuarioId,
      conteudo: comentario.conteudo,
      dataComentario: comentario.dataComentario,
      visibilidade: comentario.visibilidade,
      status: comentario.status,
    };
  }

  async delete(id: string): Promise<void> {
    await prisma.comentario.delete({ where: { id } });
  }

  async findByPostId(postId: string): Promise<ComentarioResponseDTO[]> {
    const comentarios = await prisma.comentario.findMany({
      where: { postId },
      include: {
        usuario: {
          select: { username: true } // agora traz o nome do usuário
        }
      }
    });

    return comentarios.map(comentario => ({
      id: comentario.id,
      postId: comentario.postId,
      usuarioId: comentario.usuarioId,
      conteudo: comentario.conteudo,
      dataComentario: comentario.dataComentario,
      visibilidade: comentario.visibilidade,
      status: comentario.status,
      username: comentario.usuario.username
    }));
  }
}

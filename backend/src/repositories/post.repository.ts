import { prisma } from '../database/prisma-client';
import { CreatePostDTO, PostResponseDTO } from '../interfaces/post.dto';

export class PostRepository {
  async create(data: CreatePostDTO): Promise<PostResponseDTO> {
    const post = await prisma.post.create({ data });

    // Buscar o nome do usuário associado ao post
    const usuario = await prisma.usuario.findUnique({
      where: { id: post.usuarioId },
      select: { nome: true, username: true},
    });

    // Também pode incluir curtidas já existentes (normalmente será 0 no create)
    return {
      id: post.id,
      usuarioId: post.usuarioId,
      usuarioNome: usuario?.nome || 'Usuário desconhecido',
      username:usuario?.username || 'desconhecido',
      conteudo: post.conteudo,
      dataPublicacao: post.dataPublicacao,
      visibilidade: post.visibilidade,
      status: post.status,
      curtidas: 0,
      liked: false,
    };
  }

  async getPostById(id: string) {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            username: true,
          },
        },
      },
    })
  }

  async findAll(loggedUserId: string): Promise<PostResponseDTO[]> {
    const posts = await prisma.post.findMany({
      include: {
        usuario: { select: { nome: true, username: true } },
        _count: { select: { curtidas: true, comentarios: true } },
        // Retorna as curtidas desse post feitas pelo usuário logado
        curtidas: {
          where: { usuarioId: loggedUserId },
        },
      },
    });
  
    return posts.map((post) => ({
      id: post.id,
      usuarioId: post.usuarioId,
      usuarioNome: post.usuario?.nome || 'Usuário desconhecido',
      username:        post.usuario?.username || 'desconhecido',
      conteudo: post.conteudo,
      dataPublicacao: post.dataPublicacao,
      visibilidade: post.visibilidade,
      status: post.status,
      curtidas: post._count.curtidas,
      // Se o array "curtidas" filtrado tiver pelo menos um elemento, o post foi curtido pelo usuário logado.
      liked: post.curtidas.length > 0,
      comentariosCount: post._count.comentarios,
    }));
  }
  
}
  
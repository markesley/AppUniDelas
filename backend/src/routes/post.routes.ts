import { FastifyInstance } from 'fastify';
import { PostService } from '../services/post.service';
import { CreatePostDTO } from '../interfaces/post.dto';
import { authMiddleware } from '../middlewares/authMiddleware';

export async function postRoutes(fastify: FastifyInstance) {
  const postService = new PostService();

  fastify.post<{ Body: CreatePostDTO }>('/', { preHandler: [authMiddleware] }, async (req, reply) => {
    try {
      const user = req.user as { id: string };
      if (!user) {
        return reply.code(401).send({ message: 'Usuário não autenticado' });
      }
  
      const data = {
        ...req.body,
        usuarioId: user.id, // força o ID do token JWT
      };
  
      const post = await postService.create(data);
      return reply.code(201).send(post);
    } catch (error) {
      console.error('Erro ao criar post:', error);
      return reply.code(500).send({ error: 'Erro ao criar post' });
    }
  });

  fastify.get('/', { preHandler: [authMiddleware] }, async (req, reply) => {
    try {
      // Extrai o ID do usuário do token validado
      const user = req.user as { id: string };
      if (!user) {
        return reply.code(401).send({ message: 'Usuário não autenticado' });
      }
      // Passa o ID para o método findAll do serviço
      const posts = await postService.findAll(user.id);
      return reply.send(posts);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      return reply.code(500).send({ error: 'Erro ao buscar posts' });
    }
  });

  // Buscar post por ID
  fastify.get<{ Params: { id: string } }>(
    '/:id',
    { preHandler: [authMiddleware] },
    async (req, reply) => {
      const postService = new PostService()
      const post = await postService.getPostById(req.params.id)
  
      if (!post) {
        return reply.code(404).send({ error: 'Post não encontrado' })
      }
  
      return reply.send({
        id: post.id,
        conteudo: post.conteudo,
        username: post.usuario.username,
        dataPublicacao: post.dataPublicacao,
      })
    }
  )
}
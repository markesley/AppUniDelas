import { FastifyInstance, FastifyRequest } from 'fastify';
import { authMiddleware } from '../middlewares/authMiddleware';
import { prisma } from '../database/prisma-client';

export async function userSearchRoutes(fastify: FastifyInstance) {
  // Pesquisa por email — sem retornar dados sensíveis
  fastify.get<{ Params: { email: string } }>('/search/:email', { preHandler: [authMiddleware] }, async (req, reply) => {
    try {
      const { email } = req.params;
      // Procura usuário, omitindo senha
      const user = await prisma.usuario.findFirst({
        where: { email },
        select: {
          id: true,
          nome: true,
          email: true,
          fotoPerfil: true,
        },
      });
      if (!user) {
        return reply.code(404).send({ message: 'Usuário não encontrado' });
      }
      return reply.send(user);
    } catch (error) {
      console.error('Erro na pesquisa de usuário:', error);
      return reply.code(500).send({ error: 'Erro ao pesquisar usuário' });
    }
  });

  
}

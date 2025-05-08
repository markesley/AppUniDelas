import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { UserCreate } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { authMiddleware } from '../middlewares/authMiddleware';

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserService();

  fastify.post<{ Body: UserCreate }>('/', async (req, reply) => {
    const { name,username, email, password, telefone, universidadeId } = req.body;

    try {
      const data = await userUseCase.create({ name, username, email, password , telefone, universidadeId});
      return reply.code(201).send(data);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return reply.code(500).send({ error: 'Erro ao criar usuário' });
    }
  });

  fastify.get('/', async (req, reply) => {
    return reply.send({ message: 'API de usuários funcionando!' });
  });

  fastify.get<{ Params: { id: string } }>(
    '/:id',
    { preHandler: [authMiddleware] },
    async (request, reply) => {
      const { id } = request.params;
      try {
        const profile = await userUseCase.getProfile(id);
        if (!profile) {
          return reply.code(404).send({ message: 'Usuário não encontrado' });
        }
        return reply.send(profile);
      } catch (err) {
        console.error('Erro ao buscar perfil:', err);
        return reply.code(500).send({ error: 'Erro no servidor' });
      }
    }
  );
}

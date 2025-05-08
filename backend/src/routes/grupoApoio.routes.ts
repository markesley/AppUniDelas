import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { GrupoApoioService } from '../services/grupoApoio.service';
import { CreateGrupoApoioDTO } from '../interfaces/group.dto';
import { authMiddleware } from '../middlewares/authMiddleware'

export async function grupoApoioRoutes(app: FastifyInstance) {
  const service = new GrupoApoioService();

  app.post<{
    Body: CreateGrupoApoioDTO
  }>(
    '/',
    { preHandler: [authMiddleware] },
    async (request: FastifyRequest<{ Body: CreateGrupoApoioDTO }>, reply: FastifyReply) => {
      try {
        // `authMiddleware` já validou o token e populou `request.user`
        const user = request.user as { id: string; universidadeId?: string }
        if (!user || !user.universidadeId) {
          return reply.status(401).send({ message: 'Usuário ou universidade inválida' })
        }

        // Mescla o corpo com o universidadeId do usuário
        const payload: CreateGrupoApoioDTO = {
          ...request.body,
          universidadeId: user.universidadeId,
        }

        const grupo = await service.createGrupoApoio(payload)
        return reply.status(201).send(grupo)
      } catch (error) {
        request.log.error(error)
        return reply.status(500).send({ error: 'Erro ao criar grupo de apoio' })
      }
    }
  )

  // Listar apenas grupos da universidade do usuário
  app.get(
    '/',
    { preHandler: [authMiddleware] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = request.user as { id: string; universidadeId?: string }
        if (!user || !user.universidadeId) {
          return reply.status(401).send({ message: 'Usuário ou universidade inválida' })
        }
        const grupos = await service.getAllGruposApoioPorUniversidade(user.universidadeId)
        return reply.send(grupos)
      } catch (error) {
        request.log.error(error)
        return reply.status(500).send({ error: 'Erro ao buscar grupos de apoio' })
      }
    }
  )

  app.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const { id } = request.params;
      const grupo = await service.getGrupoApoioById(id);
      if (!grupo) {
        return reply.status(404).send({ error: 'Grupo de apoio não encontrado' });
      }
      return reply.send(grupo);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar grupo de apoio' });
    }
  });

  app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const { id } = request.params;
      await service.deleteGrupoApoio(id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao deletar grupo de apoio' });
    }
  });
}

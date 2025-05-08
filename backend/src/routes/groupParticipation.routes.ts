import { FastifyInstance, FastifyRequest } from 'fastify';
import { ParticipacaoGrupoService } from '../services/groupParticipation.service';
import { CreateParticipacaoGrupoDTO } from '../interfaces/groupParticipation.dto';

export async function participacaoGrupoRoutes(app: FastifyInstance) {
  const service = new ParticipacaoGrupoService();

  app.post('/', async (request: FastifyRequest<{ Body: CreateParticipacaoGrupoDTO }>, reply) => {
    try {
      const participacao = await service.criarParticipacao(request.body);
      return reply.status(201).send(participacao);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao adicionar usuário ao grupo' });
    }
  });

  app.get('/grupo/:grupoId', async (request: FastifyRequest<{ Params: { grupoId: string } }>, reply) => {
    try {
      const participacoes = await service.listarParticipacoesPorGrupo(request.params.grupoId);
      return reply.send(participacoes);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar participações no grupo' });
    }
  });

  app.get('/usuario/:usuarioId', async (request: FastifyRequest<{ Params: { usuarioId: string } }>, reply) => {
    try {
      const participacoes = await service.listarParticipacoesPorUsuario(request.params.usuarioId);
      return reply.send(participacoes);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar grupos do usuário' });
    }
  });

  app.delete('/:usuarioId/:grupoId', async (request: FastifyRequest<{ Params: { usuarioId: string; grupoId: string } }>, reply) => {
    try {
      await service.removerParticipacao(request.params.usuarioId, request.params.grupoId);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao remover usuário do grupo' });
    }
  });
}

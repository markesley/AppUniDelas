import { FastifyInstance, FastifyRequest } from 'fastify';
import { AcessoRecursoService } from '../services/resourceAccess.service';
import { CreateAcessoRecursoDTO } from '../interfaces/resourceAccess.dto';

export async function acessoRecursoRoutes(app: FastifyInstance) {
  const service = new AcessoRecursoService();

  app.post('/', async (request: FastifyRequest<{ Body: CreateAcessoRecursoDTO }>, reply) => {
    try {
      const acesso = await service.registrarAcesso(request.body);
      return reply.status(201).send(acesso);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao registrar acesso' });
    }
  });

  app.get('/', async (_, reply) => {
    try {
      const acessos = await service.listarAcessos();
      return reply.send(acessos);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao listar acessos' });
    }
  });

  app.get('/usuario/:usuarioId', async (request: FastifyRequest<{ Params: { usuarioId: string } }>, reply) => {
    try {
      const acessos = await service.listarAcessosPorUsuario(request.params.usuarioId);
      return reply.send(acessos);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar acessos do usuário' });
    }
  });

  app.delete('/:usuarioId/:recursoId', async (request: FastifyRequest<{ Params: { usuarioId: string; recursoId: string } }>, reply) => {
    try {
      await service.removerAcesso(request.params.usuarioId, request.params.recursoId);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao remover acesso' });
    }
  });
}

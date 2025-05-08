import { FastifyInstance, FastifyRequest } from 'fastify';
import { RecursoService } from '../services/resource.service'
import { CreateRecursoDTO } from '../interfaces/resource.dto';

export async function recursoRoutes(app: FastifyInstance) {
  const service = new RecursoService();

  app.post('/', async (request: FastifyRequest<{ Body: CreateRecursoDTO }>, reply) => {
    try {
      const recurso = await service.criarRecurso(request.body);
      return reply.status(201).send(recurso);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao criar recurso' });
    }
  });

  app.get('/', async (_, reply) => {
    try {
      const recursos = await service.listarRecursos();
      return reply.send(recursos);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao listar recursos' });
    }
  });

  app.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const recurso = await service.obterRecurso(request.params.id);
      if (!recurso) {
        return reply.status(404).send({ error: 'Recurso não encontrado' });
      }
      return reply.send(recurso);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar recurso' });
    }
  });

  app.put('/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<CreateRecursoDTO> }>, reply) => {
    try {
      const recurso = await service.atualizarRecurso(request.params.id, request.body);
      return reply.send(recurso);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao atualizar recurso' });
    }
  });

  app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      await service.removerRecurso(request.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao excluir recurso' });
    }
  });
}

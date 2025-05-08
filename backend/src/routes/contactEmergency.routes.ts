import { FastifyInstance, FastifyRequest } from 'fastify';
import { ContatoEmergenciaService } from '../services/contactEmergency.service';
import { CreateContatoEmergenciaDTO } from '../interfaces/contactEmergency.dto';
import { authMiddleware } from '../middlewares/authMiddleware';

export async function contatoEmergenciaRoutes(app: FastifyInstance) {
  const service = new ContatoEmergenciaService();

  app.post('/', async (request: FastifyRequest<{ Body: CreateContatoEmergenciaDTO }>, reply) => {
    try {
      const contato = await service.criarContato(request.body);
      return reply.status(201).send(contato);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao criar contato de emergência' });
    }
  });

  app.get('/', async (_, reply) => {
    try {
      const contatos = await service.listarContatos();
      return reply.send(contatos);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao listar contatos de emergência' });
    }
  });

  app.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const contato = await service.buscarPorId(request.params.id);
      if (!contato) {
        return reply.status(404).send({ error: 'Contato não encontrado' });
      }
      return reply.send(contato);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar contato de emergência' });
    }
  });

  app.put('/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<CreateContatoEmergenciaDTO> }>, reply) => {
    try {
      const contato = await service.atualizarContato(request.params.id, request.body);
      return reply.send(contato);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao atualizar contato de emergência' });
    }
  });

  app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      await service.removerContato(request.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao remover contato de emergência' });
    }
  });
}

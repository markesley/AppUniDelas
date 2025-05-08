import { FastifyInstance, FastifyRequest } from 'fastify';
import { ContatoConfiancaService } from '../services/contactTrust.service';
import { CreateContatoConfiancaDTO } from '../interfaces/contactTrust.dto';
import { authMiddleware } from '../middlewares/authMiddleware';

export async function contatoConfiancaRoutes(app: FastifyInstance) {
  const service = new ContatoConfiancaService();

  app.post('/', async (request: FastifyRequest<{ Body: CreateContatoConfiancaDTO }>, reply) => {
    try {
      const contato = await service.criarContato(request.body);
      return reply.status(201).send(contato);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao criar contato de confiança' });
    }
  });

  // app.get('/', async (_, reply) => {
  //   try {
  //     const contatos = await service.listarContatos();
  //     return reply.send(contatos);
  //   } catch (error) {
  //     return reply.status(500).send({ error: 'Erro ao listar contatos de confiança' });
  //   }
  // });

  app.get('/meus-contatos', { preHandler: [authMiddleware] }, async (request, reply) => {
    try {
      const user = request.user as { id: string };
      const contatos = await service.buscarPorUsuario(user.id);
      return reply.send(contatos);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar seus contatos de confiança' });
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
      return reply.status(500).send({ error: 'Erro ao buscar contato de confiança' });
    }
  });

  app.get('/usuario/:usuarioId', async (request: FastifyRequest<{ Params: { usuarioId: string } }>, reply) => {
    try {
      const contatos = await service.buscarPorUsuario(request.params.usuarioId);
      return reply.send(contatos);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar contatos por usuário' });
    }
  });

  app.put('/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<CreateContatoConfiancaDTO> }>, reply) => {
    try {
      const contato = await service.atualizarContato(request.params.id, request.body);
      return reply.send(contato);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao atualizar contato de confiança' });
    }
  });

  app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      await service.removerContato(request.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao remover contato de confiança' });
    }
  });
}

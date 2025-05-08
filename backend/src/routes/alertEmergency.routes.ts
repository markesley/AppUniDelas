import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AlertaEmergenciaService } from '../services/alertEmergency.service';
import { CreateAlertaEmergenciaDTO } from '../interfaces/alertEmergency.dto';
import { authMiddleware } from '../middlewares/authMiddleware'

export async function alertaEmergenciaRoutes(app: FastifyInstance) {
  const service = new AlertaEmergenciaService();

  app.post(
    '/',
    async (request: FastifyRequest<{ Body: CreateAlertaEmergenciaDTO }>, reply: FastifyReply) => {
      try {
        // pega o ID do usuário logado
        const user = request.user as { id: string };
        const { latitude, longitude } = request.body;

        // chama o service com o userId do token
        const alerta = await service.criarAlerta({
          usuarioId: user.id,
          latitude,
          longitude,
        });

        return reply.status(201).send(alerta);
      } catch (err) {
        console.error('Erro ao criar alerta:', err);
        return reply.status(500).send({ error: 'Erro ao criar alerta de emergência' });
      }
    }
  );

  // GET /alertas-emergencia/meus
  app.get('/meus', async (request, reply) => {
    try {
      const user = request.user as { id: string };
      const alertas = await service.buscarPorUsuario(user.id);
      return reply.send(alertas);
    } catch (err) {
      console.error('Erro ao buscar meus alertas:', err);
      return reply.status(500).send({ error: 'Erro ao buscar seus alertas' });
    }
  });

  // (opcional) GET /alertas-emergencia/:id
  app.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    try {
      const alerta = await service.buscarPorId(request.params.id);
      if (!alerta) {
        return reply.status(404).send({ error: 'Alerta não encontrado' });
      }
      return reply.send(alerta);
    } catch (err) {
      console.error('Erro ao buscar alerta por ID:', err);
      return reply.status(500).send({ error: 'Erro ao buscar alerta de emergência' });
    }
  });



  // PUT: Atualizar alerta de emergência
  app.put('/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<CreateAlertaEmergenciaDTO> }>, reply: FastifyReply) => {
    try {
      const alerta = await service.atualizarAlerta(request.params.id, request.body);
      return reply.send(alerta);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao atualizar alerta de emergência' });
    }
  });

  // DELETE: Remover alerta de emergência
  app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      await service.removerAlerta(request.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao remover alerta de emergência' });
    }
  });

  app.get(
    '/recebidos',
    { preHandler: [authMiddleware] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = request.user as { id: string }
        const alertas = await service.buscarAlertasRecebidos(user.id)
        return reply.send(alertas)
      } catch (err) {
        console.error(err)
        return reply.status(500).send({ error: 'Erro ao buscar alertas recebidos' })
      }
    }
  )
}

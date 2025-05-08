import { FastifyInstance } from 'fastify';
import { CreateUniversidadeDTO } from '../interfaces/university.dto';
import { UniversidadeService } from '../services/university.service';
import { authMiddleware } from '../middlewares/authMiddleware';

export async function universityRoutes(fastify: FastifyInstance) {
  const universidadeService = new UniversidadeService();

  fastify.post<{ Body: CreateUniversidadeDTO }>('/', async (req, reply) => {
    try {
      const universidade = await universidadeService.create(req.body);
      return reply.code(201).send(universidade);
    } catch (error) {
      console.error('Erro ao criar universidade:', error);
      return reply.code(500).send({ error: 'Erro ao criar universidade' });
    }
  });

  fastify.get('/',  { preHandler: [authMiddleware] },async (_, reply) => {
    try {
      const universidades = await universidadeService.findAll();
      return reply.send(universidades);
    } catch (error) {
      console.error('Erro ao buscar universidades:', error);
      return reply.code(500).send({ error: 'Erro ao buscar universidades' });
    }
  });
}
import { FastifyInstance, FastifyRequest } from 'fastify';
import { authMiddleware } from '../middlewares/authMiddleware';
import { prisma } from '../database/prisma-client';

export async function redeApoioRoutes(fastify: FastifyInstance) {
  // Enviar solicitação para rede de apoio
  fastify.post('/solicitacao', { preHandler: [authMiddleware] }, async (req, reply) => {
    try {
      const { solicitadoId } = req.body as { solicitadoId: string };
      const solicitante = req.user as { id: string };

      const existente = await prisma.redeApoioRequest.findFirst({
        where: {
          solicitanteId: solicitante.id,
          solicitadoId,
          status: "PENDENTE",
        },
      });

      if (existente) {
        return reply.code(400).send({ message: 'Já existe uma solicitação pendente para esse usuário' });
      }

      const solicitacao = await prisma.redeApoioRequest.create({
        data: {
          solicitanteId: solicitante.id,
          solicitadoId,
        },
      });

      return reply.code(201).send(solicitacao);
    } catch (error) {
      console.error('Erro ao enviar solicitação de rede de apoio:', error);
      return reply.code(500).send({ error: 'Erro ao enviar solicitação' });
    }
  });

  // Aceitar solicitação e criar contatos de confiança
  fastify.put<{ Params: { id: string } }>('/solicitacao/:id/aceitar', { preHandler: [authMiddleware] }, async (req, reply) => {
    try {
      const solicitacaoId = req.params.id;
      const solicitado = req.user as { id: string };

      // Atualiza a solicitação para "ACEITA"
      const solicitacao = await prisma.redeApoioRequest.updateMany({
        where: { id: solicitacaoId, solicitadoId: solicitado.id, status: "PENDENTE" },
        data: { status: "ACEITA" },
      });

      if (solicitacao.count === 0) {
        return reply.code(404).send({ message: 'Solicitação não encontrada ou não autorizada' });
      }

      // Consulta os dados dos usuários envolvidos
      const solicitacaoInfo = await prisma.redeApoioRequest.findUnique({
        where: { id: solicitacaoId },
        include: {
          solicitante: true,
          solicitado: true,
        },
      });

      if (!solicitacaoInfo) {
        return reply.code(404).send({ message: 'Solicitação não encontrada após atualização' });
      }

      // Cria contatos de confiança para ambos
      await prisma.contatoConfianca.createMany({
        data: [
          {
            usuarioId: solicitacaoInfo.solicitanteId,
            nome: solicitacaoInfo.solicitado.nome,
            telefone: solicitacaoInfo.solicitado.telefone || 'Não informado',
            email: solicitacaoInfo.solicitado.email,
            relacao: 'Rede de Apoio',
          },
          {
            usuarioId: solicitacaoInfo.solicitadoId,
            nome: solicitacaoInfo.solicitante.nome,
            telefone: solicitacaoInfo.solicitante.telefone || 'Não informado',
            email: solicitacaoInfo.solicitante.email,
            relacao: 'Rede de Apoio',
          },
        ],
      });

      return reply.send({ message: 'Solicitação aceita e contatos adicionados com sucesso' });
    } catch (error) {
      console.error('Erro ao aceitar solicitação:', error);
      return reply.code(500).send({ error: 'Erro ao aceitar solicitação' });
    }
  });

  // Listar solicitações pendentes recebidas
  fastify.get('/solicitacao/pendentes', { preHandler: [authMiddleware] }, async (req, reply) => {
    const user = req.user as { id: string };
    const pendentes = await prisma.redeApoioRequest.findMany({
      where: {
        solicitadoId: user.id,
        status: 'PENDENTE',
      },
      include: {
        solicitante: { select: { id: true, nome: true, email: true } },
      },
      orderBy: { dataSolicitacao: 'desc' },
    });
    console.log("Solicitações pendentes consultadas.");
    return reply.send(pendentes);
  });

  // Cancelar solicitação
  fastify.delete('/solicitacao/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    const { id } = req.params as { id: string };
    await prisma.redeApoioRequest.delete({ where: { id } });
    return reply.status(204).send();
  });
}

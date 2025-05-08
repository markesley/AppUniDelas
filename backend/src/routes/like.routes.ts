import { FastifyInstance } from "fastify";
import { CurtidaService } from "../services/like.service";
import { CurtidaDTO } from "../interfaces/like.dto";
import { authMiddleware } from "../middlewares/authMiddleware";

export async function curtidaRoutes(fastify: FastifyInstance) {
  const curtidaService = new CurtidaService();

  // Curtir um post (agora autenticado)
  fastify.post<{ Body: { postId: string } }>("/", { preHandler: [authMiddleware] }, async (req, reply) => {
    try {
      const { postId } = req.body;
      const user = req.user as { id: string };

      const curtida = await curtidaService.curtirPost({ postId, usuarioId: user.id });
      return reply.code(201).send(curtida);
    } catch (error: any) {
      if (error.code === "P2002") {
        return reply.code(200).send({ message: "Post já curtido" });
      }
      console.error("Erro ao curtir post:", error);
      return reply.code(500).send({ error: "Erro ao curtir post" });
    }
  });

  // Descurtir um post (agora autenticado)
  fastify.delete<{ Params: { postId: string } }>("/:postId", { preHandler: [authMiddleware] }, async (req, reply) => {
    try {
      const user = req.user as { id: string };
      await curtidaService.descurtirPost(user.id, req.params.postId);
      return reply.code(204).send();
    } catch (error) {
      console.error("Erro ao descurtir post:", error);
      return reply.code(500).send({ error: "Erro ao descurtir post" });
    }
  });

  // Obter todas as curtidas de um post
  fastify.get<{ Params: { postId: string } }>("/post/:postId", async (req, reply) => {
    try {
      const curtidas = await curtidaService.getCurtidasByPostId(req.params.postId);
      return reply.send(curtidas);
    } catch (error) {
      console.error("Erro ao buscar curtidas do post:", error);
      return reply.code(500).send({ error: "Erro ao buscar curtidas do post" });
    }
  });

  // Contar curtidas de um post
  fastify.get<{ Params: { postId: string } }>("/post/:postId/count", async (req, reply) => {
    try {
      const count = await curtidaService.countCurtidasByPostId(req.params.postId);
      return reply.send({ count });
    } catch (error) {
      console.error("Erro ao contar curtidas do post:", error);
      return reply.code(500).send({ error: "Erro ao contar curtidas do post" });
    }
  });

  // Obter todas as curtidas de um usuário autenticado
  fastify.get("/usuario", { preHandler: [authMiddleware] }, async (req, reply) => {
    try {
      const user = req.user as { id: string };
      const curtidas = await curtidaService.getCurtidasByUsuarioId(user.id);
      return reply.send(curtidas);
    } catch (error) {
      console.error("Erro ao buscar curtidas do usuário:", error);
      return reply.code(500).send({ error: "Erro ao buscar curtidas do usuário" });
    }
  });
}

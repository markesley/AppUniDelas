// src/routes/auth.routes.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcryptjs'
import { prisma } from '../database/prisma-client'

interface LoginBody {
  email: string
  senha: string
  expoPushToken?: string
}

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/login',
    async (request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) => {
      const { email, senha, expoPushToken } = request.body

      // 1) busca usuário + senha + universidade
      const usuario = await prisma.usuario.findUnique({
        where: { email },
        select: { id: true, senha: true, universidadeId: true, email: true },
      })
      if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        return reply.code(401).send({ message: 'E-mail ou senha inválidos' })
      }

      // 2) atualiza expoPushToken se vier
      if (expoPushToken) {
        await prisma.usuario.update({
          where: { id: usuario.id },
          data: { expoPushToken },
        })
      }

      // 3) payload estendida inclui universidadeId
      const payload = {
        id: usuario.id,
        email: usuario.email,
        universidadeId: usuario.universidadeId,
      }

      // 4) assina JWT
      const token = app.jwt.sign(payload, {
        // você pode adicionar expiresIn etc.
      })

      // 5) envia cookie e resposta completa
      reply
        .setCookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60, // 1h
        })
        .send({
          id: usuario.id,
          email: usuario.email,
          message: 'Login realizado com sucesso!',
        })
    }
  )
}

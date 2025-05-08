import { prisma } from '../database/prisma-client';
import { User, UserCreate, UserRepository } from '../interfaces/user.interface';

class UserRepositoryPrisma implements UserRepository {
  async create(data: UserCreate): Promise<User> {
    const result = await prisma.usuario.create({
      data: {
        nome:           data.name,
        username:       data.username,
        email:          data.email,
        senha:          data.password,
        telefone:       data.telefone,
        universidadeId: data.universidadeId,
      },
      include: {
        universidade: {
          select: { id: true, nome: true }
        }
      }
    });

    // mapeia `null` para `undefined`
    return {
      id:              result.id,
      name:            result.nome,
      username:        result.username,
      email:           result.email,
      telefone:        result.telefone ?? undefined,
      universidadeNome: result.universidade?.nome ?? undefined,
      createdAt:       result.dataCadastro,
      updatedAt:       result.ultimoAcesso ?? new Date(),
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.usuario.findFirst({
      where: { email },
      include: {
        universidade: {
          select: { nome: true }
        }
      }
    });

    if (!result) return null;

    return {
      id:              result.id,
      name:            result.nome,
      username:        result.username,
      email:           result.email,
      telefone:        result.telefone ?? undefined,
      universidadeNome: result.universidade?.nome ?? undefined,
      createdAt:       result.dataCadastro,
      updatedAt:       result.ultimoAcesso ?? new Date(),
    };
  }
}

export { UserRepositoryPrisma };

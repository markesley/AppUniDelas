import bcrypt from 'bcryptjs';
import { User, UserCreate, UserRepository } from '../interfaces/user.interface';
import { UserRepositoryPrisma } from '../repositories/user.repository';
import { UserProfileResponseDTO } from '../interfaces/userProfile.dto';
import { prisma } from '../database/prisma-client';


class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async create({ name, username, email, password, telefone, universidadeId }: UserCreate): Promise<User> {
    const verifyIfUserExists = await this.userRepository.findByEmail(email);
    if (verifyIfUserExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.userRepository.create({ email, name, username, password: hashedPassword, telefone, universidadeId });

    return result;
  }

  async getProfile(userId: string): Promise<UserProfileResponseDTO | null> {
    const user = await prisma.usuario.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nome: true,
        email: true,
        username: true,
        telefone: true,
        fotoPerfil: true,
        universidade: {
          select: { id: true, nome: true, cidade: true, estado: true },
        },
      },
    });
    if (!user) return null;
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      username: user.username,
      telefone: user.telefone,
      fotoPerfil: user.fotoPerfil,
      universidade: user.universidade,
    };
  }

}

export { UserService};
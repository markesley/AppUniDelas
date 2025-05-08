import { ComentarioRepository } from "../repositories/comment.repository";
import { CreateComentarioDTO, ComentarioResponseDTO } from "../interfaces/comment.dto";

export class ComentarioService {
  private comentarioRepository = new ComentarioRepository();

  async createComentario(data: CreateComentarioDTO): Promise<ComentarioResponseDTO> {
    return this.comentarioRepository.create(data);
  }

  async getAllComentarios(): Promise<ComentarioResponseDTO[]> {
    return this.comentarioRepository.findAll();
  }

  async getComentarioById(id: string): Promise<ComentarioResponseDTO | null> {
    return this.comentarioRepository.findById(id);
  }

  async deleteComentario(id: string): Promise<void> {
    return this.comentarioRepository.delete(id);
  }

  async getComentariosByPostId(postId: string): Promise<ComentarioResponseDTO[]> {
    return await this.comentarioRepository.findByPostId(postId);
  }
}

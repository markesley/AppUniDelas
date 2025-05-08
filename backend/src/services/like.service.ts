import { CurtidaRepository } from "../repositories/like.repository";
import { CurtidaDTO, CurtidaResponseDTO } from "../interfaces/like.dto";

export class CurtidaService {
  private curtidaRepository = new CurtidaRepository();

  async curtirPost(data: CurtidaDTO): Promise<CurtidaResponseDTO> {
    return await this.curtidaRepository.curtirPost(data);
  }

  async descurtirPost(usuarioId: string, postId: string): Promise<void> {
    return await this.curtidaRepository.descurtirPost(usuarioId, postId);
  }

  async getCurtidasByPostId(postId: string): Promise<CurtidaResponseDTO[]> {
    return await this.curtidaRepository.getCurtidasByPostId(postId);
  }

  async getCurtidasByUsuarioId(usuarioId: string): Promise<CurtidaResponseDTO[]> {
    return await this.curtidaRepository.getCurtidasByUsuarioId(usuarioId);
  }

  async countCurtidasByPostId(postId: string): Promise<number> {
    return await this.curtidaRepository.countCurtidasByPostId(postId);
  }
}

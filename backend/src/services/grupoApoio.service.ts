import { GrupoApoioRepository } from '../repositories/grupoApoio.repository';
import { CreateGrupoApoioDTO, GrupoApoioResponseDTO } from '../interfaces/group.dto';

export class GrupoApoioService {
  private repository: GrupoApoioRepository;

  constructor() {
    this.repository = new GrupoApoioRepository();
  }

  async createGrupoApoio(data: CreateGrupoApoioDTO): Promise<GrupoApoioResponseDTO> {
    return this.repository.create(data);
  }

  async getAllGruposApoioPorUniversidade(universidadeId: string) {
    return this.repository.findByUniversidade(universidadeId)
  }

  async getAllGruposApoio(): Promise<GrupoApoioResponseDTO[]> {
    return this.repository.findAll();
  }

  async getGrupoApoioById(id: string): Promise<GrupoApoioResponseDTO | null> {
    return this.repository.findById(id);
  }

  async deleteGrupoApoio(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
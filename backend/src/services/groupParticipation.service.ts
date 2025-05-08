import { ParticipacaoGrupoRepository } from '../repositories/groupParticipation.repository';
import { CreateParticipacaoGrupoDTO } from '../interfaces/groupParticipation.dto';

export class ParticipacaoGrupoService {
  private repository: ParticipacaoGrupoRepository;

  constructor() {
    this.repository = new ParticipacaoGrupoRepository();
  }

  async criarParticipacao(data: CreateParticipacaoGrupoDTO) {
    return this.repository.create(data);
  }

  async listarParticipacoesPorGrupo(grupoId: string) {
    return this.repository.findByGrupo(grupoId);
  }

  async listarParticipacoesPorUsuario(usuarioId: string) {
    return this.repository.findByUsuario(usuarioId);
  }

  async removerParticipacao(usuarioId: string, grupoId: string) {
    return this.repository.delete(usuarioId, grupoId);
  }
}

import { AcessoRecursoRepository } from '../repositories/resourceAccess.repository'
import { CreateAcessoRecursoDTO } from '../interfaces/resourceAccess.dto';

export class AcessoRecursoService {
  private repository: AcessoRecursoRepository;

  constructor() {
    this.repository = new AcessoRecursoRepository();
  }

  async registrarAcesso(data: CreateAcessoRecursoDTO) {
    return this.repository.create(data);
  }

  async listarAcessos() {
    return this.repository.findAll();
  }

  async listarAcessosPorUsuario(usuarioId: string) {
    return this.repository.findByUserId(usuarioId);
  }

  async removerAcesso(usuarioId: string, recursoId: string) {
    return this.repository.delete(usuarioId, recursoId);
  }
}

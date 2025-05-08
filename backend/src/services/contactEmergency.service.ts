import { ContatoEmergenciaRepository } from '../repositories/contactEmergency.repository'
import { CreateContatoEmergenciaDTO } from '../interfaces/contactEmergency.dto'

export class ContatoEmergenciaService {
  private repository: ContatoEmergenciaRepository;

  constructor() {
    this.repository = new ContatoEmergenciaRepository();
  }

  async criarContato(data: CreateContatoEmergenciaDTO) {
    return this.repository.create(data);
  }

  async listarContatos() {
    return this.repository.findAll();
  }

  async buscarPorId(id: string) {
    return this.repository.findById(id);
  }

  async atualizarContato(id: string, data: Partial<CreateContatoEmergenciaDTO>) {
    return this.repository.update(id, data);
  }

  async removerContato(id: string) {
    return this.repository.delete(id);
  }
}

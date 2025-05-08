import { ContatoConfiancaRepository } from '../repositories/contactTrust.repository';
import { CreateContatoConfiancaDTO } from '../interfaces/contactTrust.dto';

export class ContatoConfiancaService {
  private repository: ContatoConfiancaRepository;

  constructor() {
    this.repository = new ContatoConfiancaRepository();
  }

  async criarContato(data: CreateContatoConfiancaDTO) {
    return this.repository.create(data);
  }

  async listarContatos() {
    return this.repository.findAll();
  }

  async buscarPorId(id: string) {
    return this.repository.findById(id);
  }

  async buscarPorUsuario(usuarioId: string) {
    return this.repository.findByUsuario(usuarioId);
  }

  async atualizarContato(id: string, data: Partial<CreateContatoConfiancaDTO>) {
    return this.repository.update(id, data);
  }

  async removerContato(id: string) {
    return this.repository.delete(id);
  }
}

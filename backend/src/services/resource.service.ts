import { RecursoRepository } from '../repositories/resource.repository'
import { CreateRecursoDTO } from '../interfaces/resource.dto'

export class RecursoService {
  private repository: RecursoRepository;

  constructor() {
    this.repository = new RecursoRepository();
  }

  async criarRecurso(data: CreateRecursoDTO) {
    return this.repository.create(data);
  }

  async listarRecursos() {
    return this.repository.findAll();
  }

  async obterRecurso(id: string) {
    return this.repository.findById(id);
  }

  async atualizarRecurso(id: string, data: Partial<CreateRecursoDTO>) {
    return this.repository.update(id, data);
  }

  async removerRecurso(id: string) {
    return this.repository.delete(id);
  }
}

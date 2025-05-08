import { CreateUniversidadeDTO, UniversidadeResponseDTO } from '../interfaces/university.dto';
import { UniversidadeRepository } from '../repositories/university.repository';

export class UniversidadeService {
  private universidadeRepository: UniversidadeRepository;

  constructor() {
    this.universidadeRepository = new UniversidadeRepository();
  }

  async create(data: CreateUniversidadeDTO): Promise<UniversidadeResponseDTO> {
    return await this.universidadeRepository.create(data);
  }

  async findAll(): Promise<UniversidadeResponseDTO[]> {
    return await this.universidadeRepository.findAll();
  }
}
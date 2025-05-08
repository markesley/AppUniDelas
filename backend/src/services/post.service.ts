import { PostRepository } from '../repositories/post.repository';
import { CreatePostDTO, PostResponseDTO } from '../interfaces/post.dto';

export class PostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async create(data: CreatePostDTO): Promise<PostResponseDTO> {
    return this.postRepository.create(data);
  }

  async findAll(loggedUserId: string): Promise<PostResponseDTO[]> {
    return this.postRepository.findAll(loggedUserId);
  }

  async getPostById(id: string) {
    return this.postRepository.getPostById(id);
  }

}
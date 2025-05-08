import { Visibilidade, Status } from '@prisma/client';

export interface CreatePostDTO {
  usuarioId: string;
  conteudo: string;
  visibilidade: Visibilidade;
  status: Status;
}

export interface PostResponseDTO {
  id: string;
  usuarioId: string;
  usuarioNome:string;
  username:string;
  conteudo: string;
  dataPublicacao: Date;
  visibilidade: Visibilidade;
  status: Status;
  curtidas: number;
  liked?: boolean;
  comentariosCount?: number;
}
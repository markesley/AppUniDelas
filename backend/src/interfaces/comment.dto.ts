import { Visibilidade, Status } from '@prisma/client';

export interface CreateComentarioDTO {
    postId: string;
    usuarioId: string;
    conteudo: string;
    visibilidade: Visibilidade;
    status: Status;
}
  
export interface ComentarioResponseDTO {
    id: string;
    postId: string;
    usuarioId: string;
    conteudo: string;
    dataComentario: Date;
    visibilidade: Visibilidade;
    status: Status;
    username?: string;
}
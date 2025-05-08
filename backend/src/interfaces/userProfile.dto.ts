export interface UserProfileResponseDTO {
    id: string;
    nome: string;
    email: string;
    username: string;
    telefone?: string | null;
    fotoPerfil?: string | null;
    universidade?: {
      id: string;
      nome: string;
      cidade: string;
      estado: string;
    } | null;
  }
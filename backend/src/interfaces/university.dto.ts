export interface CreateUniversidadeDTO {
    nome: string;
    cidade: string;
    estado: string;
    endereco: string;
    contatoSeguranca?: string;
    contatoOuvidoria?: string;
  }
  
  export interface UniversidadeResponseDTO {
    id: string;
    nome: string;
    cidade: string;
    estado: string;
    endereco: string;
    contatoSeguranca?: string;
    contatoOuvidoria?: string;
    // createdAt: Date;
  }


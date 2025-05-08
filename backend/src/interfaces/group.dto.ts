export interface CreateGrupoApoioDTO {
    nome: string;
    descricao: string;
    local?: string;
    horario?: string;
    diaSemana?: string;
    universidadeId: string;
    imagem?: string;
    contatoResponsavel?: string;
  }
  
  export interface GrupoApoioResponseDTO {
    id: string;
    nome: string;
    descricao: string;
    local?: string;
    horario?: string;
    diaSemana?: string;
    universidadeId: string;
    imagem?: string;
    contatoResponsavel?: string;
  }
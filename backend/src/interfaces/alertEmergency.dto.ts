// src/interfaces/alertEmergency.dto.ts
export interface CreateAlertaEmergenciaDTO {
    latitude: number;
    longitude: number;
  }
  
  // o que devolvemos ao cliente
  export interface AlertaEmergenciaResponseDTO {
    id: string;
    usuarioId: string;
    dataHora: Date;
    latitude: number;
    longitude: number;
    whatsappLinks: { nome: string; link: string }[];
  }
  
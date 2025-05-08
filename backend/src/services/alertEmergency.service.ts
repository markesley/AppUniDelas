import { AlertaEmergenciaRepository } from '../repositories/alertEmergency.repository';
import { CreateAlertaEmergenciaDTO, AlertaEmergenciaResponseDTO } from '../interfaces/alertEmergency.dto';
import { prisma } from '../database/prisma-client'

export class AlertaEmergenciaService {
  private repo = new AlertaEmergenciaRepository();

  async criarAlerta(data: CreateAlertaEmergenciaDTO & { usuarioId: string }) {
    return this.repo.create(data);
  }

  listarAlertas(): Promise<AlertaEmergenciaResponseDTO[]> {
    return this.repo.findAll();
  }

  buscarPorId(id: string): Promise<AlertaEmergenciaResponseDTO | null> {
    return this.repo.findById(id);
  }

  buscarPorUsuario(usuarioId: string): Promise<AlertaEmergenciaResponseDTO[]> {
    return this.repo.findByUsuario(usuarioId);
  }

  atualizarAlerta(id: string, data: Partial<CreateAlertaEmergenciaDTO>): Promise<AlertaEmergenciaResponseDTO> {
    return this.repo.update(id, data);
  }

  removerAlerta(id: string): Promise<void> {
    return this.repo.delete(id);
  }

  /** busca todos os alertas gerados por quem me tem como contato de confiança */
  async buscarAlertasRecebidos(usuarioId: string): Promise<AlertaEmergenciaResponseDTO[]> {
    // busca as relações aceitas
    const requests = await prisma.redeApoioRequest.findMany({
      where: {
        status: 'ACEITA',
        OR: [
          { solicitanteId: usuarioId },
          { solicitadoId: usuarioId },
        ],
      },
    })
    const contactUserIds = requests.map((r) =>
      r.solicitanteId === usuarioId ? r.solicitadoId : r.solicitanteId
    )

    console.log("contatos")
    console.log(contactUserIds)

    // busca alertas desses usuários
    const alertas = await prisma.alertaEmergencia.findMany({
      where: { usuarioId: { in: contactUserIds } },
      orderBy: { dataHora: 'desc' },
      include: {
        usuario: {
          select: { nome: true },
        },
      },
    })
    
    return alertas.map((a) => ({
      id: a.id,
      usuarioId: a.usuarioId,
      usuarioNome: a.usuario.nome, // <- adiciona aqui
      dataHora: a.dataHora,
      latitude: a.latitude!,
      longitude: a.longitude!,
    }))
  }
}

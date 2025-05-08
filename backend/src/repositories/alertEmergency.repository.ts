import { prisma } from '../database/prisma-client';
import { CreateAlertaEmergenciaDTO, AlertaEmergenciaResponseDTO } from '../interfaces/alertEmergency.dto';
import { NotificationService } from '../services/notification.service';
import { Expo } from 'expo-server-sdk'

export class AlertaEmergenciaRepository {

  private notificationSvc = new NotificationService();
  private expo = new Expo()

  /** Cria um alerta e já dispara push para todos os contatos de confiança de quem gerou */
  async create(data: {
    usuarioId: string
    latitude: number
    longitude: number
  }): Promise<AlertaEmergenciaResponseDTO> {
    // 1) cria o alerta
    const alerta = await prisma.alertaEmergencia.create({
      data: {
        usuarioId: data.usuarioId,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    })

    // 2) busca todas as relações aceitas da rede de apoio
    const requests = await prisma.redeApoioRequest.findMany({
      where: {
        status: 'ACEITA',
        OR: [
          { solicitanteId: data.usuarioId },
          { solicitadoId: data.usuarioId },
        ],
      },
    })

    // 3) transforma em IDs dos "outros" (quem receberá o push)
    const contactUserIds = requests.map((r) =>
      r.solicitanteId === data.usuarioId ? r.solicitadoId : r.solicitanteId
    )

    // 4) busca os expoPushTokens desses usuários
    const users = await prisma.usuario.findMany({
      where: {
        id: { in: contactUserIds },
        expoPushToken: { not: null },
      },
      select: { expoPushToken: true, nome: true },
    })

    // 5) monta as mensagens
    const messages = users
      .map((u) => u.expoPushToken!)
      .filter(Expo.isExpoPushToken)
      .map((token) => ({
        to: token,
        sound: 'default' as const,
        title: '🚨 Alerta de Emergência',
        body: `${alerta.usuarioId} está em perigo!`,
        data: {
          latitude: alerta.latitude!,
          longitude: alerta.longitude!,
          usuarioId: alerta.usuarioId,
        },
      }))

    // 6) envia em chunks
    const chunks = this.expo.chunkPushNotifications(messages)
    for (const chunk of chunks) {
      try {
        await this.expo.sendPushNotificationsAsync(chunk)
      } catch (err) {
        console.error('Erro ao enviar chunk de notificação:', err)
      }
    }

    // 7) Busca números de telefone dos contatos
    const contatos = await prisma.usuario.findMany({
      where: {
        id: { in: contactUserIds },
        telefone: { not: null },
      },
      select: { telefone: true, nome: true }
    })

    // 8) Monta a mensagem
    const usuarioOrigem = await prisma.usuario.findUnique({
      where: { id: data.usuarioId },
      select: { nome: true }
    })

    const msg = `🚨 Alerta de emergência!\n${usuarioOrigem?.nome} precisa de ajuda!\nLocalização: https://www.google.com/maps?q=${data.latitude},${data.longitude}`
    const msgEncoded = encodeURIComponent(msg)

    // 9) Monta os links do WhatsApp com nome
    const whatsappLinks = contatos
      .filter(c => c.telefone)
      .map(c => {
        const numero = c.telefone!.replace(/\D/g, '');
        return {
          nome: c.nome,
          link: `https://wa.me/${numero}?text=${msgEncoded}`,
        };
      });

    // você pode logar, retornar, salvar ou até enviar por push esses links
    console.log('Links WhatsApp para contatos de confiança:', whatsappLinks)

    return {
      ...this.toDTO(alerta),
      whatsappLinks, // inclui os links no retorno
    }
  }

  async findAll(): Promise<AlertaEmergenciaResponseDTO[]> {
    const list = await prisma.alertaEmergencia.findMany();
    return list.map(this.toDTO);
  }

  async findById(id: string): Promise<AlertaEmergenciaResponseDTO | null> {
    const alerta = await prisma.alertaEmergencia.findUnique({ where: { id } });
    return alerta ? this.toDTO(alerta) : null;
  }

  async findByUsuario(usuarioId: string): Promise<AlertaEmergenciaResponseDTO[]> {
    const list = await prisma.alertaEmergencia.findMany({ where: { usuarioId } });
    return list.map(this.toDTO);
  }

  async update(id: string, data: Partial<CreateAlertaEmergenciaDTO>): Promise<AlertaEmergenciaResponseDTO> {
    const alerta = await prisma.alertaEmergencia.update({
      where: { id },
      data,
    });
    return this.toDTO(alerta);
  }

  async delete(id: string): Promise<void> {
    await prisma.alertaEmergencia.delete({ where: { id } });
  }

  private toDTO(alerta: any): AlertaEmergenciaResponseDTO {
    return {
      id: alerta.id,
      usuarioId: alerta.usuarioId,
      dataHora: alerta.dataHora,
      latitude: alerta.latitude!,
      longitude: alerta.longitude!,
      whatsappLinks: alerta.whatsappLinks
    };
  }
}

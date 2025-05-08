// src/services/notification.service.ts
import { Expo, ExpoPushMessage } from 'expo-server-sdk';

export class NotificationService {
  private expo = new Expo();

  async sendPushNotifications(messages: ExpoPushMessage[]) {
    // Filtra apenas tokens válidos
    const valid = messages.filter(msg => Expo.isExpoPushToken(msg.to));
    const chunks = this.expo.chunkPushNotifications(valid);
    for (const chunk of chunks) {
      try {
        await this.expo.sendPushNotificationsAsync(chunk);
      } catch (error) {
        console.error('Erro enviando push chunk:', error);
      }
    }
  }
}

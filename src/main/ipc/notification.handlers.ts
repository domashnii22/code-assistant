import { ipcMain, Notification } from 'electron';
import {
  IPC_CHANNELS,
  ShowNotificationParams,
  ShowNotificationResponse,
} from '../../shared/ipc-types';

export function registerNotificationHandlers() {
  ipcMain.handle(
    IPC_CHANNELS.SHOW_NOTIFICATION,
    (event, params: ShowNotificationParams): ShowNotificationResponse => {
      // Проверка параметров (безопасность)
      if (
        !params ||
        typeof params.title !== 'string' ||
        typeof params.body !== 'string'
      ) {
        throw new Error('Invalid notification parameters');
      }

      // Создаём нативное уведомление
      const notification = new Notification({
        title: params.title,
        body: params.body,
      });
      notification.show();

      return;
    },
  );
}

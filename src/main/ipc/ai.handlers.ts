import { ipcMain } from 'electron';
import { YandexGPTService } from '../services/yandexgpt.service';
import { loadCredentialsOrFromEnv } from '../services/secureStorage'; // путь исправлен

let yandexService: YandexGPTService | null = null;

// Новая функция для автоинициализации
export function initYandexGPT() {
  try {
    const creds = loadCredentialsOrFromEnv();
    if (creds) {
      yandexService = new YandexGPTService(creds.folderId, creds.apiKey);
      console.log('✅ YandexGPT инициализирован (авто)');
    } else {
      console.warn('⚠️ YandexGPT не инициализирован: ключи не найдены');
    }
  } catch (err) {
    console.error('[YandexGPT] Ошибка инициализации:', err);
  }
}

export function registerAIHandlers() {
  // Синхронная генерация
  ipcMain.handle('ai:generate', async (event, prompt: string) => {
    if (!yandexService) throw new Error('YandexGPT не инициализирован');
    return yandexService.generate(prompt);
  });

  // Стриминг
  ipcMain.handle('ai:stream', async (event, prompt: string) => {
    if (!yandexService) throw new Error('YandexGPT не инициализирован');
    const stream = yandexService.stream(prompt);
    for await (const token of stream) {
      event.sender.send('ai:token', token);
    }
  });
}

import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatYandexGPT } from '@langchain/yandex';

export class YandexGPTService {
  private model: ChatYandexGPT;

  constructor(folderId: string, apiKey: string) {
    this.model = new ChatYandexGPT({
      folderID: folderId,
      apiKey,
      model: 'yandexgpt-lite',
      temperature: 0.6,
      maxTokens: 2000,
    });
  }

  // Синхронный вызов (без стриминга)
  async generate(prompt: string): Promise<string> {
    const messages = [
      new SystemMessage(
        'Ты — AI-ассистент для разработчиков. Отвечай кратко и по делу.',
      ),
      new HumanMessage(prompt),
    ];
    const response = await this.model.invoke(messages);
    return response.content as string;
  }

  // Стриминг (для живого чата)
  async *stream(prompt: string): AsyncGenerator<string> {
    const messages = [
      new SystemMessage(
        'Ты — AI-ассистент для разработчиков. Отвечай кратко и по делу.',
      ),
      new HumanMessage(prompt),
    ];
    const stream = await this.model.stream(messages);
    for await (const chunk of stream) {
      yield chunk.content as string;
    }
  }
}

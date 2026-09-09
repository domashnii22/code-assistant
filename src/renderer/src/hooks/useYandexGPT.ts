import { useState, useCallback } from 'react';

export function useYandexGPT() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const generate = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setResponse('');
    try {
      const result = await window.api.generateText(prompt);
      setResponse(result);
    } catch (error) {
      console.error('YandexGPT error:', error);
      setResponse('Ошибка: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stream = useCallback((prompt: string) => {
    setIsLoading(true);
    setResponse('');
    window.api.streamText(prompt, (token: string) => {
      setResponse((prev) => prev + token);
    });
    // Отслеживаем окончание (упрощённо)
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return { response, isLoading, generate, stream };
}

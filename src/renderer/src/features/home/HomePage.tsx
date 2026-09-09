import { useState } from 'react';

export function HomePage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testYandexGPT = async () => {
    setLoading(true);
    setResponse('⏳ Отправка запроса...');
    try {
      // Используем канал 'ai:generate' через универсальный invoke
      const result = await window.api.generateText(
        'Напиши приветствие для разработчика на русском языке',
      );
      setResponse('✅ ' + result);
    } catch (error) {
      setResponse('❌ Ошибка: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Ассистент</h1>
      <button
        onClick={testYandexGPT}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Загрузка...' : '🧪 Тест YandexGPT'}
      </button>
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-50 dark:bg-gray-800 whitespace-pre-wrap">
          <h3 className="font-semibold">Ответ:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

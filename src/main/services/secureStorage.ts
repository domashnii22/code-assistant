import Store from 'electron-store';

const store = new Store({ name: 'secure' });

export function saveCredentials(folderId: string, apiKey: string): void {
  store.set('folderId', folderId);
  store.set('apiKey', apiKey);
}

export function loadCredentials(): { folderId: string; apiKey: string } | null {
  const folderId = store.get('folderId') as string | undefined;
  const apiKey = store.get('apiKey') as string | undefined;
  if (folderId && apiKey) {
    return { folderId, apiKey };
  }
  return null;
}

export function loadCredentialsOrFromEnv(): {
  folderId: string;
  apiKey: string;
} | null {
  const stored = loadCredentials();
  if (stored) return stored;

  const folderId = process.env.YANDEX_FOLDER_ID;
  const apiKey = process.env.YANDEX_API_KEY;
  if (folderId && apiKey) {
    saveCredentials(folderId, apiKey);
    return { folderId, apiKey };
  }
  return null;
}

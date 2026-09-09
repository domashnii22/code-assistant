import { useCallback } from 'react';

export const useNotification = () => {
  const showNotification = useCallback(async (title: string, body: string) => {
    try {
      await window.api.showNotification({ title, body });
    } catch (error) {
      console.error('Notification error:', error);
    }
  }, []);
  return { showNotification };
};

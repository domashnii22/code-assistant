export const IPC_CHANNELS = {
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
} as const;

export type ShowNotificationParams = {
  title: string;
  body: string;
};

export type ShowNotificationResponse = void;

import { createHashRouter } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { HomePage } from './features/home/HomePage';
import { SettingsPage } from './features/settings/SettingsPage';
import { ErrorPage } from './components/ErrorPage';

/**
 * HashRouter is used because Electron serves `file://` URLs in production;
 * BrowserRouter would 404 on refresh/navigation.
 */
export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);

import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from './contexts/ThemeContext';
import { router } from './routes';
import { initializeSeedData } from './utils/seed-data';

export default function App() {
  useEffect(() => {
    initializeSeedData();
  }, []);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
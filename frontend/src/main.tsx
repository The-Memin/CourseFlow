import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from "sonner";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import AuthProvider from './providers/AuthProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme='system' enableSystem disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        <Toaster richColors />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { Explorer } from './Explorer';
import './style.css';

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

createRoot(document.getElementById('root')!).render(<React.StrictMode><QueryClientProvider client={queryClient}><Explorer /></QueryClientProvider></React.StrictMode>);

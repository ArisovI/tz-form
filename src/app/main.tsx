import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './App.css'
import { theme } from '../shared/theme/theme.ts'
import { Toaster } from '../components/ui/toaster.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <ChakraProvider value={theme}>
            <App />
            <Toaster />
        </ChakraProvider>
    </QueryClientProvider>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import './index.css'
import App from './App.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AdminProvider>
          <CartProvider>
            <App />
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          </CartProvider>
        </AdminProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)

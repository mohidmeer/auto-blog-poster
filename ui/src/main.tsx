import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('auto-blogger')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

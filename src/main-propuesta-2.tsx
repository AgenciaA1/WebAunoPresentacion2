import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PortfolioStack from './sections/PortfolioStack.tsx'

// Propuesta 2: same home page, portfolio as a scroll story + "ver todos" grid
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App PortfolioSection={PortfolioStack} />
  </StrictMode>,
)

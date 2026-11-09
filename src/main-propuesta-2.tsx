import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Portfolio from './sections/Portfolio.tsx'

// Propuesta 2: same page, portfolio as the FlexCarousel (WebGL) gallery
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App PortfolioSection={Portfolio} />
  </StrictMode>,
)

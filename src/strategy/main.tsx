import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StrategyPage from './StrategyPage.tsx'
import "../index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StrategyPage />
  </StrictMode>,
)


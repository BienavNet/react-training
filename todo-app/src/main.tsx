import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import 'todomvc-app-css/index.css'
import App from './App.tsx'
import { FilterProvider } from './context/FilterContext.tsx'

createRoot(document.getElementById('root')!).render(
  <FilterProvider>
    <StrictMode>
      <App />
    </StrictMode>,
  </FilterProvider>
)

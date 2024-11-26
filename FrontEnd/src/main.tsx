
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GameServerProvider } from './component/GameServercontext.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <GameServerProvider>
      <App />
    </GameServerProvider>,
  // </StrictMode>
)

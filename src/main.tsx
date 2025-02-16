import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import './styles/index.css'
import '@ant-design/v5-patch-for-react-19';
import { AppRoutes } from './routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <AppRoutes />
    </App>
  </StrictMode>,
)

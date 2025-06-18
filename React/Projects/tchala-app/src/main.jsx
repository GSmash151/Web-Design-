import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css' // Import global styles
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx' // Import the AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
    <App />
    </AuthProvider> 
  </StrictMode>,
);

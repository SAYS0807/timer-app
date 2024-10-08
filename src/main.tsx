import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './styles/index.css'

const rootElement = document.getElementById('root');
if (rootElement !== null) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found.");
}

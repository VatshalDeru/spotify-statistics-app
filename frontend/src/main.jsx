import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/HeroSection/HeroSection.css'
import './components/Navbar/Navbar.css'
import App from './App.jsx'
// import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

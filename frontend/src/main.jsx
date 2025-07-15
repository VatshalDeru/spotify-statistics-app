import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/HeroSection/HeroSection.css'
import './components/Navbar/Navbar.css'
import './components/ProfilePopUpCard/ProfilePopUpCard.css'
import './components/UserDataContainer/UserDataContainer.css'
import './components/UserDataList/UserDataList.css'
import './components/UserDataListItem/UserDataListItem.css'
import App from './App.jsx'
import UserDataContextProvider from './store/user-data-context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserDataContextProvider>
      <App />
    </UserDataContextProvider>
  </StrictMode>
)

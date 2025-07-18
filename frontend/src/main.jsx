import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/HeroSection/HeroSection.css'
import './components/Navbar/Navbar.css'
import './components/ProfilePopUpCard/ProfilePopUpCard.css'
import './components/UserDataContainer/UserDataContainer.css'
import './components/UserDataList/UserDataList.css'
import './components/UserDataListItem/UserDataListItem.css'
import './components/ControlPanel/ControlPanel.css'
import './components/Notification/Notification.css'
import './components/LogoutModal/LogoutModal.css'
import App from './App.jsx'
import UserDataContextProvider from './store/user-data-context.jsx'
import NotificationContextProvider from './store/notification-context.jsx'
import Notification from './components/Notification/Notification.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationContextProvider>
      <UserDataContextProvider>
        <Notification></Notification>
        <App />
      </UserDataContextProvider>
    </NotificationContextProvider>
  </StrictMode>
)

import { useState, useEffect, useContext, useRef } from 'react';
import './App.css';
// import { getUserProfileHandler} from './http'; 
import { checkURLforParams, checkIsLoggedIn, ensureFreshToken, clearStorage } from './utils/authUtils.js'
import { isUserListeningDataComplete } from './utils/uiUtils.js';
import HeroSection from './components/HeroSection/HeroSection';
import Navbar from './components/Navbar/Navbar';
import { UserDataContext } from './store/user-data-context.jsx';
import { NotificationContext } from './store/notification-context.jsx';
import UserDataContainer from './components/UserDataContainer/UserDataContainer.jsx';
import LogoutModal from './components/LogoutModal/LogoutModal.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutModal = useRef();

  let { getUserProfileContextFn, userListeningData} = useContext(UserDataContext);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {  // useEffect(() => {
    // check for the date query params in the URL and if present, store it in localstorage
    const { status } = checkURLforParams();

    if(status === 'success') {
      showNotification('success', 'Success:', 'Logged In!');
    } else if(status === 'error'){
      showNotification('error', 'Error:', 'error logging in!');
      return;
    } // DO NOT return if status 'neutral', wont be able to persist login state upon page refresh
    
    const loggedIn = checkIsLoggedIn();
    setIsLoggedIn(loggedIn);

    const callfetchProfile = async () => {
      const isTokenFresh = await ensureFreshToken();
      if(!isTokenFresh){
        clearStorage();
        setIsLoggedIn(false);
      }

      getUserProfileContextFn(logoutModal);
    }

    if(loggedIn) {
      callfetchProfile();
    }
  }, []);

  return (
    <div className='appContainer'>
      <LogoutModal ref={logoutModal} setIsLoggedIn={setIsLoggedIn}/>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <HeroSection isLoggedIn={isLoggedIn} logoutModal={logoutModal}></HeroSection>
      {(isLoggedIn && isUserListeningDataComplete(userListeningData)) && <UserDataContainer/>}
    </div>
  );
}

export default App;

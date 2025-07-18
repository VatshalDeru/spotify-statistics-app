import { useState, useEffect, useContext, useRef } from 'react';
import './App.css';
// import { getUserProfileHandler} from './http'; 
import { storeDataFromParams, checkIsLoggedIn, ensureFreshToken, clearStorage } from './utils/authUtils.js'
// import { refreshAccessToken } from './utils/http.js';

import HeroSection from './components/HeroSection/HeroSection';
import Navbar from './components/Navbar/Navbar';
import { UserDataContext } from './store/user-data-context.jsx';
import { NotificationContext } from './store/notification-context.jsx';
import UserDataContainer from './components/UserDataContainer/UserDataContainer.jsx';
import LogoutModal from './components/LogoutModal/LogoutModal.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutModal = useRef();

  const { getUserProfileContext, userListeningData} = useContext(UserDataContext);
  const { showNotification } = useContext(NotificationContext);

  const { topArtists } = userListeningData;

  useEffect(() => {  // useEffect(() => {
    // check for the date query params in the URL and if present, store it in localstorage
    const { status } = storeDataFromParams();

    // show the relevant notification for the status of login attempt
    if(status === 'success') {
      showNotification('success', 'Success:', 'Logged In!');
    } else if(status === 'error'){
      showNotification('error', 'Error:', 'error logging in!');
      return;
    } // DO NOT return if status 'neutral', wont be able to persist login state upon page refresh
    
    // determine if user is logged in on refresh
    const loggedIn = checkIsLoggedIn();
    setIsLoggedIn(loggedIn);

    // function to call getUserProfilHandler() inside of useEffect asynchronously 
    const callfetchProfile = async () => {
      const isTokenFresh = ensureFreshToken();
      if(!isTokenFresh){
        clearStorage();
        isLoggedIn(false);
      }

      getUserProfileContext(logoutModal);
    }

    // fetch the users profile data if the user is logged in
    if(loggedIn) {
      callfetchProfile();
    }
  }, [])

  return (
    <div>
      <LogoutModal ref={logoutModal} setIsLoggedIn={setIsLoggedIn}/>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <HeroSection isLoggedIn={isLoggedIn} logoutModal={logoutModal}></HeroSection>
      {(isLoggedIn && topArtists.long_term) && <UserDataContainer/>}
    </div>
  );
}

export default App;

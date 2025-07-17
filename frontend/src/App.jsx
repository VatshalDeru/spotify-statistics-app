import { useState, useEffect, useContext } from 'react';
import './App.css';
// import { getUserProfileHandler} from './http'; 
import { storeDataFromParams, checkIsLoggedIn, checkTokenIsFresh } from './utils/authUtils.js'
import { refreshAccessToken } from './utils/http.js';

import HeroSection from './components/HeroSection/HeroSection';
import Navbar from './components/Navbar/Navbar';
import { UserDataContext } from './store/user-data-context.jsx';
import { NotificationContext } from './store/notification-context.jsx';
import UserDataContainer from './components/UserDataContainer/UserDataContainer.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { getUserProfileDataHandler, userListeningData, userProfileData } = useContext(UserDataContext);
  const { showNotification } = useContext(NotificationContext

  );

  const data = useContext(UserDataContext)
  const { topArtists } = userListeningData;

  useEffect(() => {  // useEffect(() => {
    // check for the date query params in the URL and if present, store it in localstorage
    const statusObj = storeDataFromParams();

    // show the relevant notification for the status of login attempt
    if(statusObj.status === 'success') {
      showNotification('success', 'Success:', 'Logged In!');
    } else if(statusObj.status === 'error'){
      showNotification('error', 'Error:', 'error logging in!');
      return;
    }
    
    // determine if user is logged in
    const loggedIn = checkIsLoggedIn();

    // only change state if the new loggedIn value is different from the current isLoggedIn state
    if(loggedIn !== isLoggedIn && loggedIn !== null) {
      setIsLoggedIn(loggedIn);
    };

    // function to call getUserProfilHandler() inside of useEffect asynchronously 
    const callfetchProfile = async () => {
      const isTokenFresh = checkTokenIsFresh();
      // console.log('isTokenFresh: ', isTokenFresh)
      if(!isTokenFresh) {
        const refreshed = await refreshAccessToken();

        if(!refreshed) {
          console.error('error refreshing access token');
          return;
        }
      }

      getUserProfileDataHandler();
    }

    // fetch the users profile data if the user is logged in
    if(loggedIn) {
      callfetchProfile();
    }
  }, [])

  // console.log(data)
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <HeroSection isLoggedIn={isLoggedIn}></HeroSection>
      {(isLoggedIn && topArtists.long_term) && <UserDataContainer></UserDataContainer>}
    </div>
  );
}

export default App;

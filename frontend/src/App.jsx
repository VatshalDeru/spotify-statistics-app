import { useState, useEffect, useContext } from 'react';
import './App.css';
import { getUserProfileHandler, getUserDataHandler } from './http'; 
import { storeDataFromParams, checkIsLoggedIn } from './util'

import HeroSection from './components/HeroSection/HeroSection';
import Navbar from './components/Navbar/Navbar';
import { UserDataContext } from './store/user-data-context.js';
import UserDataContainer from './components/UserDataContainer/UserDataContainer.jsx';

const  INTITIAL_USER_DATA_OBJ = {
  topArtists: [],
  topTracks: [],
  recentlyPlayedTracks: [],
  userProfileData: {},
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(INTITIAL_USER_DATA_OBJ)
  const data = useContext(UserDataContext)

  useEffect(() => {
    // check for the date query params in the URL and if present, store it in localstorage
    storeDataFromParams();

    // determine if user is logged in
    const loggedIn = checkIsLoggedIn();

    // only change state if the new loggedIn value is different from the current isLoggedIn state
    if(loggedIn !== isLoggedIn && loggedIn !== null) {
      setIsLoggedIn(loggedIn);
    };

    // function to call getUserProfilHandler() inside of useEffect asynchronously 
    const callfetchProfile = async () => {
      const userProfileData = await getUserProfileHandler();
      setUserData(prevUserData => {
        return {
          ...prevUserData,
          userProfileData
        }
      })
    }

    // fetch the users profile data if the user is logged in
    if(loggedIn) {
      callfetchProfile();
    }
  }, [])

  // initilise the userData context value so we can connect to it the state and pass it as a value 
  // to the context provider so the context is available in all nested components
  const userDataCtxValue = {
    topArtits: userData.topArtists,
    topTracks: userData.topTracks,
    recentlyPlayedTracks: userData.recentlyPlayedTracks,
    userProfileData: userData.userProfileData,
    getUserDataHandler
  }
  // console.log(data)
  return (
    <UserDataContext value={userDataCtxValue}>
      <Navbar isLoggedIn={isLoggedIn}/>
      <HeroSection isLoggedIn={isLoggedIn}></HeroSection>
      {/* {<UserDataContainer></UserDataContainer>} */}
    </UserDataContext>
  );
}

export default App;

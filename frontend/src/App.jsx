import { useState, useEffect } from 'react';
import './App.css';
import { getUserProfileHandler } from './http'; 
import { storeDateFromParams, checkTokenIsFresh } from './util'

import HeroSection from './components/HeroSection/HeroSection';
import Navbar from './components/Navbar/Navbar';
import { UserDataContext } from './store/user-data-context.js';

const  INTITIAL_USER_DATA_OBJ = {
    topArtits: [],
    topTracks: [],
    listeningHistory: [],
    userProfileData: {},
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(INTITIAL_USER_DATA_OBJ)

  useEffect(() => {
    // check for the date query params in the URL and if present, store it in localstorage
    storeDateFromParams();

    // determine if user is logged in
    const loggedIn = checkTokenIsFresh();

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

    // fetch the users profile data if 
    if(loggedIn) {
      callfetchProfile();
    }
  }, [isLoggedIn])

  // initilise the userData context value so we can connect to it the state and pass it as a value 
  // to the context provider so the context is available in all nested components
  const userDataCtxValue = {
    topArtits: userData.topArtits,
    topTracks: userData.topTracks,
    listeningHistory: userData.listeningHistory,
    userProfileData: userData.userProfileData,
  }
  // console.log(userData)
  return (
    <UserDataContext value={userDataCtxValue}>
      <Navbar isLoggedIn={isLoggedIn}/>
      <HeroSection isLoggedIn={isLoggedIn}></HeroSection>
    </UserDataContext>
  );
}

export default App;

import { useState, useEffect } from 'react';
import './App.css';
import { storeDateFromParams, checkTokenIsExpired, getUserProfileHandler } from './util'; 

import HeroSection from './components/HeroSection/HeroSection';
import Navbar from './components/Navbar/Navbar';

const  INTITIAL_USER_DATA_OBJ = {
    topArtits: [],
    topTracks: [],
    listeningHistory: [],
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(INTITIAL_USER_DATA_OBJ)

  useEffect(() => {
    // check for the date query params in the URL and if present, store it in localstorage
    storeDateFromParams();

    // determine if user is logged in
    const loggedIn = !checkTokenIsExpired();

    // only change state if the new loggedIn value is different from the current isLoggedIn state
    if(loggedIn !== isLoggedIn) {
      setIsLoggedIn(loggedIn);
    };

    // function to call getUserProfilHandler() inside of useEffect asynchronously 
    const callfetchProfile = async () => {
      const userProfileData = await getUserProfileHandler();
      console.log('userProfileData: ', userProfileData);
    }

    // fetch the users profile data if 
    if(loggedIn) {
      callfetchProfile();
    }
  }, [isLoggedIn])

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn}/>
      <HeroSection isLoggedIn={isLoggedIn}></HeroSection>
    </>
  );
}

export default App;

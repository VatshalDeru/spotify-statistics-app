import { useState, useEffect } from 'react';
import './App.css';
import { storeDateFromParams, checkTokenIsExpired, getUserProfileHandler } from './util'; 

import HeroSection from './components/HeroSection/HeroSection';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // check for the date query params in the URL and if present, store it in localstorage
    storeDateFromParams();

    // determine if user is logged in
    const loggedIn = !checkTokenIsExpired();
    // const loggedIn = checkIsLoggedIn();#


    
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
    
    // console.log('isLoggedIn: ', loggedIn);
  }, [])
  // console.log('App.jsx - isLoggedIn: ', isLoggedIn)

  // const loginHandlerFn = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/login');
  //     const data = await response.json();
  //     console.log(data);
  //     window.location.replace(data)
  //   } catch (error) {
  //     console.log(error) 
  //   }
  // }

  // const getUserInfoHandlerFn = async () => {
  //   const accessToken = localStorage.getItem("access_token");
  //   try {

  //     // console.log('sdf')
  //     const response = await fetch('http://localhost:3000/userData', 
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ accessToken })
  //       })
  //     console.log(response);
  //     const data  = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn}/>
      <HeroSection isLoggedIn={isLoggedIn}></HeroSection>
    </>
  );
}

export default App;

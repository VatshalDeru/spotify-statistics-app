import { useState, useEffect } from 'react';
import './App.css';
import { storeTokensFromParams, checkIsLoggedIn } from './util'; 

import HeroSection from './components/HeroSection/HeroSection';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      storeTokensFromParams();

      const loggedIn = checkIsLoggedIn();
      setIsLoggedIn(loggedIn);
      // console.log('isLoggedIn: ', loggedIn);
  }, [isLoggedIn])

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
      <HeroSection></HeroSection>
    </>
  );
}

export default App;

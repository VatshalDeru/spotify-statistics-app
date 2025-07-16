import { useState, useEffect, useContext } from 'react';
import './App.css';
// import { getUserProfileHandler} from './http'; 
import { storeDataFromParams, checkIsLoggedIn } from './util'

import HeroSection from './components/HeroSection/HeroSection';
import Navbar from './components/Navbar/Navbar';
import { UserDataContext } from './store/user-data-context.jsx';
import UserDataContainer from './components/UserDataContainer/UserDataContainer.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { getUserProfileDataHandler, userListeningData } = useContext(UserDataContext)
  const { topArtists } = userListeningData;

  useEffect(() => {  // useEffect(() => {
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
      getUserProfileDataHandler();
    }

    // fetch the users profile data if the user is logged in
    if(loggedIn) {
      callfetchProfile();
    }
  }, [])

  // console.log(userListeningData)
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <HeroSection isLoggedIn={isLoggedIn}></HeroSection>
      {(isLoggedIn && topArtists.long_term) && <UserDataContainer></UserDataContainer>}
    </>
  );
}

export default App;

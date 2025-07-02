import { useState, useEffect } from "react";
import { storeTokensFromParams, checkIsLoggedIn } from '../../util'; 

export default function Navbar() {
    const [ isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        storeTokensFromParams();

        const loggedIn = checkIsLoggedIn();
        console.log('isLoggedIn: ', loggedIn);
    }, [])

    const loginHandlerFn = async () => {
    try {
      const response = await fetch('http://localhost:3000/login');
      const data = await response.json();
      console.log(data);
      window.location.replace(data)
    } catch (error) {
      console.log(error) 
    }
  }

    return <div className="navbarContainer">
        <button onClick={loginHandlerFn}>{isLoggedIn  ? 'Logged In' : 'Login'}</button>
        {/* <button onClick={getUserInfoHandlerFn}>get user info</button> */}
    </div>
    ;
}
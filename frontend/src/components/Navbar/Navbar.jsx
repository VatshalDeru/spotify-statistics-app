import { useState, useEffect } from "react";
import { storeTokensFromParams, checkIsLoggedIn } from '../../util'; 
import { getUserProfileHandler } from "../../util"

export default function Navbar() {
    // const { loggedIn }  = useContext(LoginContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const loginStatus = checkIsLoggedIn();
        if(isLoggedIn !== loginStatus){
            setIsLoggedIn(loginStatus);
        }

        const getUserProf = async () => {
            const data = await getUserProfileHandler();
            console.log(data)
            return data;
        }
        // after logging in, fetch the user profile detail so we can display it in navbar
        if(isLoggedIn) getUserProf();
        // console.log('Navbar.jsx', data)
    }, [isLoggedIn])

    const loginHandlerFn = async () => {
        try {
        const response = await fetch('http://localhost:3000/login');
        const data = await response.json();
        console.log('authURL: ', data);
        window.location.replace(data)
        } catch (error) {
        console.log(error) 
        }
    }
    // console.log('this is the context state for login: ', isLoggedIn)

    return <div className="navbarContainer">
        <button onClick={loginHandlerFn}>{isLoggedIn  ? 'Logged In' : 'Login'}</button>
        {/* <button onClick={getUserInfoHandlerFn}>get user info</button> */}
    </div>
    ;
}
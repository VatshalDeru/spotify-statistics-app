import { useState, useEffect, useContext } from "react";
import { storeTokensFromParams, checkIsLoggedIn } from '../../util'; 
import { getUserInfoHandlerFn } from "../../util"

export default function Navbar({ isLoggedIn }) {
    // const { loggedIn }  = useContext(LoginContext);
    
    useEffect(() => {
        storeTokensFromParams();

        const loggedIn = checkIsLoggedIn();
        console.log('isLoggedIn: ', loggedIn);

        // after logging in, fetch the user profile detail so we can display it in navbar
        getUserInfoHandlerFn();
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
    // console.log('this is the context state for login: ', isLoggedIn)

    return <div className="navbarContainer">
        <button onClick={loginHandlerFn}>{isLoggedIn  ? 'Logged In' : 'Login'}</button>
        {/* <button onClick={getUserInfoHandlerFn}>get user info</button> */}
    </div>
    ;
}
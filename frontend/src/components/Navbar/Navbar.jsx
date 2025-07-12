import { useState, useEffect, useContext, useRef } from "react";
import { storeDateFromParams, checkIsLoggedIn } from '../../util'; 
import { getUserProfileHandler } from "../../util"
import { UserDataContext } from "../../store/user-data-context.js";
import ProfilePopUpCard from "../ProfilePopUpCard/ProfilePopUpCard.jsx";

export default function Navbar({isLoggedIn}) {

    const [isCardOpen, setIsCardOpen] = useState(false)

    const  { userProfileData } = useContext(UserDataContext);
    // console.log(userProfileData)
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

    const openCard = () => {
        setIsCardOpen(true);
        // console.log(cardRef)
    }
    const closeCard = () => {
        setIsCardOpen(false);
    }

    console.log(isCardOpen)
    return <div className="navbarContainer">
        {!isLoggedIn && <button onClick={loginHandlerFn}>{isLoggedIn  ? 'Logged In' : 'Login'}</button>}
        {(isLoggedIn && userProfileData.images) && <div className="profileImg" onClick={openCard}><img src={ userProfileData.images[0].url} alt="" /></div>}
        {(isLoggedIn && isCardOpen)  && <ProfilePopUpCard open={isCardOpen} closeCard={closeCard}></ProfilePopUpCard>}
    </div>
    ;
}
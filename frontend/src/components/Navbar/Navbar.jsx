import { useState,  useContext } from "react";
import {  loginHandlerFn } from '../../http'; 
import { UserDataContext } from "../../store/user-data-context.jsx";
import ProfilePopUpCard from "../ProfilePopUpCard/ProfilePopUpCard.jsx";


// eslint-disable-next-line react/prop-types
export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const [isCardOpen, setIsCardOpen] = useState(false)
    const  { userProfileData, topTracks } = useContext(UserDataContext);

    const openCard = () => {
        setIsCardOpen(true);
        // console.log(cardRef)
    }
    const closeCard = () => {
        setIsCardOpen(false);
    }

    // console.log(userProfileData)
    return <div className="navbarContainer">
        {!isLoggedIn && <button onClick={loginHandlerFn}>Login</button>}
        {(isLoggedIn && userProfileData.images) && <div className="profileImg" onClick={openCard}><img src={ userProfileData.images[0].url} alt="Profile Picture" /></div>}
        {(isLoggedIn && isCardOpen)  && <ProfilePopUpCard open={isCardOpen} closeCard={closeCard} setIsLoggedIn={setIsLoggedIn}></ProfilePopUpCard>}
    </div>
}
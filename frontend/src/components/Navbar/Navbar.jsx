import { useState,  useContext } from "react";
import {  loginFn } from '../../utils/http.js'; 
import { UserDataContext } from "../../store/user-data-context.jsx";
import { NotificationContext } from "../../store/notification-context.jsx";
import ProfilePopUpCard from "../ProfilePopUpCard/ProfilePopUpCard.jsx";


// eslint-disable-next-line react/prop-types
export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const [isCardOpen, setIsCardOpen] = useState(false)
    const  { userProfileData, isProfileDataPresent } = useContext(UserDataContext);
    const { showNotification } = useContext(NotificationContext);

    const openCard = () => {
        setIsCardOpen(true);
        // console.log(cardRef)
    }
    const closeCard = () => {
        setIsCardOpen(false);
    }

    const loginClickHandler = async () => {
        showNotification('pending', 'Pending:', 'Logging in...');
        const error = await loginFn();
        if(error) {
            console.log(error);
            showNotification('error', 'Error:', 'Error logging you in!');
        };
    }

    return <div className="navbarContainer">
        {!isLoggedIn && <button onClick={loginClickHandler}>Login</button>}
        {(isLoggedIn && isProfileDataPresent) && <div className="profileImg" onClick={openCard} data-testid='profile-button'><img src={ userProfileData.images[0].url} alt="Profile Picture" /></div>}
        {(isLoggedIn && isCardOpen)  && <ProfilePopUpCard open={isCardOpen} closeCard={closeCard} setIsLoggedIn={setIsLoggedIn}></ProfilePopUpCard>}
    </div>
}
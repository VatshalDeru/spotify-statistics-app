import { useContext, useRef, useEffect } from "react"

import { UserDataContext } from "../../store/user-data-context.jsx";
import { NotificationContext } from "../../store/notification-context.jsx";
import { handleLogout } from "../../utils/authUtils.js";

// eslint-disable-next-line react/prop-types
export default function ProfilePopUpCard({ open, closeCard, setIsLoggedIn }) {
    //get the uesr profile data from conext to use in the card
    const { userProfileData } = useContext(UserDataContext);
    const { showNotification } = useContext(NotificationContext); 
    
    const cardRef = useRef(null);


    useEffect(() => {
        // sepereate event handler function so we can clear the event later
        const handleClickOut = (event) => {
            console.log(cardRef.current)
            // close the card if user clicks outside of the card
            if(cardRef.current && !cardRef.current.contains(event.target)) {
                closeCard();
            }
        }
        document.addEventListener('mousedown', handleClickOut);

        // clean up function for removing the event listener when this component is unmounted from the DOM
        return () => {
            document.removeEventListener('mousedown', handleClickOut)
        }
    }, [closeCard])

    const clickLogoutBtnHandler = () => {
        handleLogout();
        setIsLoggedIn(false);
        showNotification('success', 'Success:', 'you have been logged out')
    }

    console.log(userProfileData)

    if(!open) return null
    if(!userProfileData?.external_urls?.spotify ||
        !userProfileData?.images[0]?.url ||
        !userProfileData?.display_name ||
        !userProfileData?.id ||
        (userProfileData?.followers?.total === null)
    ) return null;
    
    return (
        <div className="profileCardContainer" ref={cardRef}>
            <div className="profilePhotoContainer">
                <a href={userProfileData?.external_urls.spotify} target="_blank" data-testid='profile-link'><img src={userProfileData.images ? userProfileData.images[0].url : '#'} alt="user spotify profile picture" /></a>
            </div>
            <h2 className="userName">{userProfileData.display_name}</h2>
            <p className="userId" data-testid='userId'>id: {userProfileData.id}</p>
            <p className="userFollowers" data-testid='userFollower'>Followers: {userProfileData.followers.total}</p>
            <div className="logoutBtnContainer">
                <button onClick={clickLogoutBtnHandler}>Logout</button>  
            </div>
        </div>
    )
}
import { useContext, useRef, useEffect } from "react"

import { UserDataContext } from "../../store/user-data-context.js";
import { handleLogout } from "../../util.js";

export default function ProfilePopUpCard({ open, closeCard}) {
    //get the uesr profile data from conext to use in the card
    const { userProfileData } = useContext(UserDataContext);
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


    if(!open) return null
    return (
        <div className="profileCardContainer" ref={cardRef}>
            <div className="profilePhotoContainer">
                <a href={userProfileData.external_urls.spotify} target="_blank"><img src={userProfileData.images ? userProfileData.images[0].url : '#'} alt="" /></a>
                </div>
                <h2 className="userName">{userProfileData.display_name}</h2>
                <p className="userId">id: {userProfileData.id}</p>
                <p className="userFollowers">Followers: {userProfileData.followers.total}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
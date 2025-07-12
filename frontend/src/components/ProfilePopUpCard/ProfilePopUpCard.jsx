import { useContext, useRef, useEffect } from "react"

import { UserDataContext } from "../../store/user-data-context.js";

export default function ProfilePopUpCard({ open, closeCard}) {
    //get the uesr profile data from conext to use in the card
    const { userProfileData } = useContext(UserDataContext);
    const cardRef = useRef(null);

    // console.log(cardRef)
    useEffect(() => {
        const handleClickOut = (event) => {
            console.log(cardRef.current)
            if(cardRef && !cardRef.current.contains(event.target)) {
                closeCard();
            }
        }
        document.addEventListener('mousedown', handleClickOut);

        return () => {
            document.removeEventListener('mousedown', handleClickOut)
        }
    }, [])

    // console.log(userProfileData.external_urls.spotify)

    if(!open) return null
    return (
        <div className="profileCardContainer" ref={cardRef}>
            <div className="profilePhotoContainer">
                <a href={userProfileData.external_urls.spotify} target="_blank"><img src={userProfileData.images ? userProfileData.images[0].url : '#'} alt="" /></a>
                </div>
                <h2 className="userName">{userProfileData.display_name}</h2>
                <p className="userId">id: {userProfileData.id}</p>
                <p className="userFollowers">Followers: {userProfileData.followers.total}</p>
            <button>Logout</button>
        </div>
    )
}
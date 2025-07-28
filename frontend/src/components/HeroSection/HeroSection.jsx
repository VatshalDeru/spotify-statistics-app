import { useContext } from "react"
import { UserDataContext } from "../../store/user-data-context.jsx"
import { isUserListeningDataComplete } from "../../utils/uiUtils.js";

// eslint-disable-next-line react/prop-types
export default function HeroSection({ isLoggedIn, logoutModal, isCreatingPlaylist }) {
    const { getStartedClickContextFn, userListeningData } = useContext(UserDataContext);
    const { isDataPresent } = userListeningData;

    return <div className="HeroContainer">
        <h1>Spotify <span>Wrapped</span></h1>
        {(isLoggedIn && !isDataPresent && !isUserListeningDataComplete(userListeningData)) && !isCreatingPlaylist &&
            <div className="actionButtonContainer">
                <button onClick={() => getStartedClickContextFn(logoutModal)}>Get Started</button>
            </div>
        }
    </div>
} 
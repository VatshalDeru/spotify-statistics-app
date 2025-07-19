import { useContext } from "react"
import { UserDataContext } from "../../store/user-data-context.jsx"
import { isUserListeningDataComplete } from "../../utils/uiUtils.js";

// eslint-disable-next-line react/prop-types
export default function HeroSection({ isLoggedIn, logoutModal }) {
    const { getStartedClickContext, userListeningData } = useContext(UserDataContext);
    const { isDataPresent } = userListeningData;

    return <div className="HeroContainer">
        <h1>Spotify <span>Wrapped</span></h1>
        {(isLoggedIn && !isDataPresent && !isUserListeningDataComplete(userListeningData)) &&
            <div className="actionButtonContainer">
                <button onClick={() => getStartedClickContext(logoutModal)}>Get Started</button>
            </div>
        }
    </div>
} 
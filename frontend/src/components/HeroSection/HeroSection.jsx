import { useContext } from "react"
import { UserDataContext } from "../../store/user-data-context.jsx"


// eslint-disable-next-line react/prop-types
export default function HeroSection({ isLoggedIn, logoutModal }) {
    const { getStartedClickHandler, userListeningData } = useContext(UserDataContext);
    const { isDataPresent } = userListeningData;

    // console.log(isDataPresent);
    return <div className="HeroContainer">
        <h1>Spotify <span>Wrapped</span></h1>
        {(isLoggedIn && !isDataPresent) &&
            <div className="actionButtonContainer">
                <button onClick={() => getStartedClickHandler(logoutModal)}>Get Started</button>
            </div>
        }
    </div>
} 
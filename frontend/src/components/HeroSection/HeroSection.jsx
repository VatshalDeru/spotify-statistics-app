import { useContext } from "react"
import { UserDataContext } from "../../store/user-data-context.jsx"


// eslint-disable-next-line react/prop-types
export default function HeroSection({ isLoggedIn }) {
    const { getStartedClickHandler } = useContext(UserDataContext);

    return <div className="HeroContainer">
        <h1>Spotify <span>Wrapped</span></h1>
        {isLoggedIn && 
            <div className="actionButtonContainer">
                <button onClick={getStartedClickHandler}>Get Started</button>
            </div>
        }
    </div>
} 
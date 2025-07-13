import { getUserDataHandler } from "../../http"

// eslint-disable-next-line react/prop-types
export default function HeroSection({ isLoggedIn }) {
    return <div className="HeroContainer">
        <h1>Spotify <span>Wrapped</span></h1>
        {isLoggedIn && 
            <div className="actionButtonContainer">
                <button onClick={getUserDataHandler}>Get Started</button>
            </div>
        }
    </div>
} 
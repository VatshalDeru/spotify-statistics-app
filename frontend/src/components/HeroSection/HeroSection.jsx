import { getUserProfileHandler } from "../../util"

export default function HeroSection({ isLoggedIn }) {
    return <div className="HeroContainer">
        <h1>Spotify <span>Wrapped</span></h1>
        {isLoggedIn && 
            <div className="actionButtonContainer">
                <button onClick={getUserProfileHandler}>Get Started</button>
            </div>
        }

    </div>
}
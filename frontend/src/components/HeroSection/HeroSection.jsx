import { getUserDataHandler, getUserProfileHandler } from "../../util"

export default function HeroSection() {
    return <div className="HeroContainer">
        <h1>Spotify <span>Wrapped</span></h1>
        <div className="actionButtonContainer">
            <button onClick={getUserProfileHandler}>Get Started</button>
        </div>
    </div>
}
import { useContext } from "react"
import { UserDataContext } from "../../store/user-data-context.jsx"
import { getUserDataHandler } from "../../http"


// eslint-disable-next-line react/prop-types
export default function HeroSection({ isLoggedIn }) {
    const { setUserData } = useContext(UserDataContext);

    const getStartedClickhandler = async () => {
        const data = await getUserDataHandler();
        console.log(data)
        setUserData(prev => ({
            ...prev,
            ...data
        }));
    }

    return <div className="HeroContainer">
        <h1>Spotify <span>Wrapped</span></h1>
        {isLoggedIn && 
            <div className="actionButtonContainer">
                <button onClick={getStartedClickhandler}>Get Started</button>
            </div>
        }
    </div>
} 
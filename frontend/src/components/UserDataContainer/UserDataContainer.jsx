import { useContext } from "react";
// import { example } from "../../http.js";
import UserDataList from "../UserDataList/UserDataList.jsx";
import { UserDataContext } from "../../store/user-data-context"


export default function UserDataContainer() {
    const { recentlyPlayedTracks } = useContext(UserDataContext);

    return <div className="userDataContainer">
        <div className="controlPanel">
            <div className="dataTypeControls">
                <button>Top Artists</button>
                <button>Top Tracks</button>
                <button>Recently Played</button>
                {/* {Object.keys(example).map((data, index) => <button key={index}>{data}</button>)} */}
            </div>
            <div className="timeControls">
                <button>4 Weeks</button>
                <button>6 Months</button>
                <button>12 Months</button>
            </div>
            <UserDataList></UserDataList>
        </div>
    </div>
}
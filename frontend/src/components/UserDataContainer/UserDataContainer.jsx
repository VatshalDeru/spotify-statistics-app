// import { useContext } from "react";
// import { UserDataContext } from "../../store/user-data-context.js";
import { example } from "../../http.js";
// import UserDataList from "../UserDataList/UserDataList.jsx";


export default function UserDataContainer() {
    // const { recentlyPlayedTracks } = useContext(UserDataContext);
    // recentlyPlayedTracks && console.log(recentlyPlayedTracks);
    for(const dataType in example) console.log(dataType)
    return <div className="userDataContainer">
        <div className="dataTypeControls">
            {Object.keys(example).map((data, index) => <button key={index}>{data}</button>)}
        </div>
        <div className=""></div>
    </div>
}
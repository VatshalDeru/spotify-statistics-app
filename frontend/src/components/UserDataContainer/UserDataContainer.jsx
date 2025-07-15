import { useContext, useState } from "react";
// import { example } from "../../http.js";
import UserDataList from "../UserDataList/UserDataList.jsx";
import { UserDataContext } from "../../store/user-data-context"
import ControlPanel from "../ControlPanel/ControlPanel.jsx";

export default function UserDataContainer() {
    const { userListeningData } = useContext(UserDataContext);
    const [selectedConfig, setSelectedConfig] = useState({
        dataType: 'recentlyPlayedTracks',
        timeRange: 'short_term'
    })

    // console.log(userListeningData)
    return <div className="userDataContainer">
        <ControlPanel setSelectedConfig={setSelectedConfig} selectedConfig={selectedConfig}></ControlPanel>
        <UserDataList selectedConfig={selectedConfig}></UserDataList>
    </div>
}
import { useState } from "react";
// import { example } from "../../http.js";
import UserDataList from "../UserDataList/UserDataList.jsx";
import ControlPanel from "../ControlPanel/ControlPanel.jsx";

export default function UserDataContainer() {
    const [selectedConfig, setSelectedConfig] = useState({
        dataType: 'topArtists',
        timeRange: 'short_term'
    });

    // console.log(userListeningData)
    return <div className="userDataContainer">
        <ControlPanel setSelectedConfig={setSelectedConfig} selectedConfig={selectedConfig}></ControlPanel>
        <UserDataList selectedConfig={selectedConfig}></UserDataList>
    </div>
}
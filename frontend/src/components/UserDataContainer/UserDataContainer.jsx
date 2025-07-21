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
    return <div data-testid='user-data-container' className="userDataContainer">
        <ControlPanel data-testid='control-panel-component' setSelectedConfig={setSelectedConfig} selectedConfig={selectedConfig}></ControlPanel>
        <UserDataList data-testid='user-data-list-component' selectedConfig={selectedConfig}></UserDataList>
    </div>
}
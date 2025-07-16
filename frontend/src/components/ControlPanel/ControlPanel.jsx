import { useContext } from "react"
import PropTypes from "prop-types";
import { UserDataContext } from "../../store/user-data-context"
import { getDisplayConfigText } from "../../util";

export default function ControlPanel({ setSelectedConfig, selectedConfig }) {
    const { userListeningData } = useContext(UserDataContext);
    const userData = {
        topArtists: userListeningData.topArtists,
        topTracks: userListeningData.topTracks,
        recentlyPlayedTracks: userListeningData.recentlyPlayedTracks,
    }
    const clickControlsHandler = (controlConfig) => {
        // console.log(controlConfig)
        setSelectedConfig(prevState => (  
            {
                ...prevState,
                ...controlConfig,
            }
        ))
    }
    // console.log(userListeningData[selectedConfig.dataType]);
    return  (
        <div className="controlPanel">

            <div className="dataTypeControls">
                {Object.keys(userData).map((key, index) => {
                    return <button key={index} className={selectedConfig.dataType === key? 'selected' : ''} onClick={() => clickControlsHandler({dataType: key})}>{getDisplayConfigText(key)}</button>
                })}
            </div>
            {selectedConfig.dataType !== 'recentlyPlayedTracks' &&
                <div className="timeControls">
                    {Object.keys(userListeningData[selectedConfig.dataType]).map((key, index) => {
                        return <button key={index} className={selectedConfig.timeRange === key? 'selected' : ''} onClick={() => clickControlsHandler({timeRange: key})}>{getDisplayConfigText(key)}</button>
                    })}
                </div>
            }
        </div>
    )
}

ControlPanel.propTypes = {
    setSelectedConfig: PropTypes.func.isRequired,
    selectedConfig: PropTypes.shape({
        dataType: PropTypes.string.isRequired,
        timeRange: PropTypes.stringisRequired,
    }).isRequired,
}; 
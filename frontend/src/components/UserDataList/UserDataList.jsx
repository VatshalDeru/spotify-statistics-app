import { useContext } from "react"
import PropTypes from 'prop-types'

import { UserDataContext } from "../../store/user-data-context"
import UserDataListItem from "../UserDataListItem/UserDataListItem"


export default function UserDataList({ selectedConfig }) {
    const { userListeningData } = useContext(UserDataContext);

    // console.log(userListeningData[selectedConfig.dataType])

    let userData;

    switch(selectedConfig.dataType) {
        case 'topArtists':
        case 'topTracks':
            userData = userListeningData[selectedConfig.dataType][selectedConfig.timeRange];
            break;
        case 'recentlyPlayedTracks':
            userData = userListeningData[selectedConfig.dataType];
            break
        default :
            console.warn('unkown dataType: ', selectedConfig.dataType)
            break
    }
        
    // console.log(userData)
    return <div className="dataListContainer">
        <ul>
            {userData.map((item, index) => {
                return <UserDataListItem key={index} itemKey={index} item={item} itemType={selectedConfig.dataType}/>
            })}
        </ul>
    </div>
}

UserDataList.propTypes = {
    selectedConfig: PropTypes.shape({
        dataType: PropTypes.string.isRequired,
        timeRange: PropTypes.string
    }).isRequired
} 
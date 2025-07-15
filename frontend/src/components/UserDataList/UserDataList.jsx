import { useContext } from "react"

import { UserDataContext } from "../../store/user-data-context"
import UserDataListItem from "../UserDataListItem/UserDataListItem"


export default function UserDataList({ selectedConfig }) {
    const { userListeningData } = useContext(UserDataContext);
    const { topArtists } = userListeningData

    console.log(selectedConfig)
    return <div className="dataListContainer">
        <ul>
            {topArtists.long_term.map((artist, index) => {
                return <UserDataListItem key={index} itemKey={index} artist={artist}/>
            })}
        </ul>
    </div>
}
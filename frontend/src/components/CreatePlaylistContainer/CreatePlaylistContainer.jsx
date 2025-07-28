import { useState } from "react";

import TrackSearchBar from "../TrackSearchBar/TrackSearchBar";
import SearchResults from "../SearchResults/SearchResults";

export default function CreatePlaylistContainer(){
    const [queries , setQueries] = useState([]);

    // console.log(queries)
    return <div className="createPlaylistContainer">
        <h2>Create Your <span>Own Playlist</span></h2>
        <TrackSearchBar setQueries={setQueries}/>
        {queries.length ? <SearchResults queries={queries}/> : null}
    </div>
}
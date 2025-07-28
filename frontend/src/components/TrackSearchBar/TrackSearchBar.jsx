import { useState } from "react";
import { getSearchedTracksResults } from "../../utils/http";
import { debounce } from "../../utils/helper";

export default function TrackSearchBar({setQueries}) {
    const submitSearchHandler = async (e) => {
        e.preventDefault();
        const query = e.target.value;
        if(!query) {
            setQueries([]);
            return;
        };

        const resultArr = await getSearchedTracksResults(query);

        console.log(resultArr)
        setQueries(resultArr)
    }

    const debouncedChangeHandler = debounce(submitSearchHandler, 500);

    return <div className="searchBarContainer">
        <form action="">
            <input type="text" name="searchTracks" placeholder="Search for tracks here" onChange={debouncedChangeHandler} spellCheck='false'/>
        </form>
    </div>
}
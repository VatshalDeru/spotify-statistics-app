

export default function SearchResults({queries}){
    // console.log(queries);

    return <div className="searchResultsContainer">
        <ul>
            {queries && queries.map((query, index) => {
                return <li key={index}>
                    <img src={query.trackImage} alt={'image of ' + query.trackName + ' track'} />
                    <p className="trackName">{query.trackName}</p>
                </li>
            })}
        </ul>
    </div>
};
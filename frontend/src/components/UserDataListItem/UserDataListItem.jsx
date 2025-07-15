

// eslint-disable-next-line react/prop-types
export default function UserDataListItem({ artist, itemKey }) {


    // initialise the content to top tracks
    // let content = <li>
    //     <div className="itemImg">
    //         <a href="track/artist url"><img src="" alt="" /></a>
    //     </div>
    //     <h3>Artist name</h3>
    // </li>

    // change the content to artists layout if itemType is 'artists'
    // if(itemType === 'artists') {
    //     // content = ''
    // }

    return <li key={itemKey}>
        <div className="itemImg">
            <a href={artist.external_urls.spotify}><img src={artist.images[0].url} alt="" /></a>
        </div>
        <h3>{artist.name}</h3>
        <div className="popularityContainer">
            <p className="popularity">#{artist.popularity}</p>
            <p>In The World</p>
        </div>
        <p>followers: {artist.followers.total}</p>
    </li>
}
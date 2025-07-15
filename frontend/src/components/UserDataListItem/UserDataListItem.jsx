import PropTypes from 'prop-types'

export default function UserDataListItem({ item, itemType, itemKey }) {
    let content;

    // console.log(item.artists.map(artist => artist.name).join(', '))

    switch(itemType) {
        case 'topArtists':
            content = <>
                <div className="itemImg">
                    <a href={item.external_urls.spotify}><img src={item.images[0].url} alt="" target='_blank'/></a>
                </div>
                <h3>{item.name}</h3>
                <div className="popularityContainer">
                    <p className="popularity">#{item.popularity}</p>
                    <p>In The World</p>
                </div>
            </>
            break;
        case 'topTracks':
            content = <>
                <div className="itemImg">
                    <a href={item.external_urls.spotify}><img src={item.album.images[0].url} alt="" target='_blank'/></a>
                </div>
                <div className="trackInfoContainer">
                    <h3>{item.name}</h3>
                    <p>{item.artists.map(artist => artist.name).join(', ')}</p>
                </div>
                <div className="popularityContainer">
                    <p className="popularity">#{item.popularity}</p>
                    <p>In The World</p>
                </div>
                {/* <p>followers: {item.followers.total}</p> */}
            </>
            break
        case 'recentlyPlayedTracks':
            content = <>
                <div className="itemImg">
                    <a href={item.track.external_urls.spotify}><img src={item.track.album.images[0].url} alt="" target='_blank'/></a>
                </div>
                <div className="trackInfoContainer">
                    <h3>{item.track.name}</h3>
                    <p>{item.track.artists.map(artist => artist.name).join(', ')}</p>
                </div>
                <div className="popularityContainer">
                    <p className="popularity">#{item.track.popularity}</p>
                    <p>In The World</p>
                </div>
                <p>played at: {item.played_at}</p>
            </>
            break
        default:
            console.warn('unknown itemTyper:', itemType)
    }
    
    console.log(itemType)
    return <li key={itemKey}>
        {content}
        {/* <div className="itemImg">
            <a href={item.external_urls.spotify}><img src={item.images[0].url} alt="" /></a>
        </div>
        <h3>{item.name}</h3>
        <div className="popularityContainer">
            <p className="popularity">#{item.popularity}</p>
            <p>In The World</p>
        </div>
        <p>followers: {item.followers.total}</p> */}
    </li>

    // return content
}

UserDataListItem.propTypes = {
    item: PropTypes.shape({
        external_urls: PropTypes.shape({
            spotify: PropTypes.string.isRequired,
        }).isRequired,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired,
            })
        ),
        name: PropTypes.string,
        popularity: PropTypes.number,
        followers: PropTypes.shape({
            total: PropTypes.number,
        }),
        artists: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
            })
        ),
        album: PropTypes.shape({
            images: PropTypes.arrayOf(
                PropTypes.shape({
                    url: PropTypes.string.isRequired,
                })
            ),
        }),
        track: PropTypes.shape({
            external_urls: PropTypes.shape({
                spotify: PropTypes.string,
            }),
            album: PropTypes.shape({
                images: PropTypes.arrayOf(
                    PropTypes.shape({
                        url: PropTypes.string,
                    })
                ),
            }),
            name: PropTypes.string,
            artists: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                })
            ),
            popularity: PropTypes.number,
        }),
        played_at: PropTypes.string,
    }).isRequired,
    itemType: PropTypes.string.isRequired,
    itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
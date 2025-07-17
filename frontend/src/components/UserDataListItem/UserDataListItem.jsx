import { formatDate, formatNumberWithCommas } from '../../utils/formatUtils';
import PropTypes from 'prop-types'

export default function UserDataListItem({ item, itemType, rank }) {
    let content;

    switch(itemType) {
        case 'topArtists':
            content = <>
                <p className="rank">{rank+1}.</p>
                <div className="itemImg">
                    <a href={item.external_urls.spotify} target='_blank'><img src={item.images[0].url} alt="" /></a>
                </div>
                <h3 className='artistName'>{item.name}</h3>
                <div className="popularityContainer">
                    <p>Popularity</p>
                    <p className="popularity">{item.popularity}</p>
                </div>
                <p className='followers'>followers: {formatNumberWithCommas(item.followers.total)}</p>
            </>
            break;
        case 'topTracks':
            content = <>
                <p className="rank">{rank+1}.</p>
                <div className="itemImg">
                    <a href={item.external_urls.spotify} target='_blank'><img src={item.album.images[0].url} alt=""/></a>
                </div>
                <div className="trackInfoContainer">
                    <h3 className='trackName'>{item.name}</h3>
                    <p className='trackArtists'>{item.artists.map(artist => artist.name).join(', ')}</p>
                </div>
                <div className="popularityContainer">
                    <p>Popularity</p>
                    <p className="popularity">{item.popularity}</p>
                </div>
                {/* <p>followers: {item.followers.total}</p> */}
            </>
            break
        case 'recentlyPlayedTracks':
            content = <>
                <div className="itemImg">
                    <a href={item.track.external_urls.spotify} target='_blank'><img src={item.track.album.images[0].url} alt=""/></a>
                </div>
                <div className="trackInfoContainer ">
                    <h3 className='trackName'>{item.track.name}</h3>
                    <p className='trackArtists'>{item.track.artists.map(artist => artist.name).join(', ')}</p>
                </div>
                <div className="popularityContainer">
                    <p>Popularity</p>
                    <p className="popularity">{item.track.popularity}</p>
                </div>
                <p className='timePlayed'>{formatDate(item.played_at)}</p>
            </>
            break
        default:
            console.warn('unknown itemTyper:', itemType)
    }
    
    return <li key={rank}>
        {content}
    </li>
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
    rank: PropTypes.number.isRequired,
};
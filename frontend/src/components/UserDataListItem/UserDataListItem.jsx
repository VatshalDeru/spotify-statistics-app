import { formatDate, formatNumberWithCommas } from '../../utils/formatUtils';
import PropTypes from 'prop-types'

export default function UserDataListItem({ item, itemType, rank }) {
    let content;

    switch(itemType) {
        case 'topArtists':
            if (!item.artistsLink || !item.image || !item.artistName || item.artistPopularity === undefined || !item.followers) {
                // console.log(!item.artistsLink)
                return null;
            }    
            content = <>
                <p className="rank">{rank}.</p>
                <div className="itemImg">
                    <a href={item.artistsLink} target='_blank'><img src={item.image} alt="" /></a>
                </div>
                <h3 className='artistName'>{item.artistName}</h3>
                <div className="popularityContainer">
                    <p>Popularity</p>
                    <p className="popularity">{item.artistPopularity}</p>
                </div>
                <p className='followers'>followers: {formatNumberWithCommas(item.followers)}</p>
            </>
            break;
        case 'topTracks':
            if (!item.trackLink || !item.image || !item.trackName || !item.artists || item.trackPopularity === undefined) return null;
            content = <>
                <p className="rank">{rank}.</p>
                <div className="itemImg">
                    <a href={item.trackLink} target='_blank'><img src={item.image} alt=""/></a>
                </div>
                <div className="trackInfoContainer">
                    <h3 className='trackName'>{item.trackName}</h3>
                    <p className='trackArtists'>{item.artists.map(artist => artist.name).join(', ')}</p>
                </div>
                <div className="popularityContainer">
                    <p>Popularity</p>
                    <p className="popularity">{item.trackPopularity}</p>
                </div>
                {/* <p>followers: {item.followers.total}</p> */}
            </>
            break
        case 'recentlyPlayedTracks':
            if (!item.trackLink || !item.image || !item.trackName || !item.artists || item.trackPopularity === undefined || !item.timeStamp) return null;
            content = <>
                <div className="itemImg">
                    <a href={item.trackLink} target='_blank'><img src={item.image} alt=""/></a>
                </div>
                <div className="trackInfoContainer recent">
                    <h3 className='recentTrackName'>{item.trackName}</h3>
                    <p className='trackArtists'>{item.artists.map(artist => artist.name).join(', ')}</p>
                </div>
                <div className="popularityContainer">
                    <p>Popularity</p>
                    <p className="popularity">{item.trackPopularity}</p>
                </div>
                <p className='timePlayed'>{formatDate(item.timeStamp)}</p>
            </>
            break
        default:
            console.warn('unknown itemType:', itemType)
            return null;
    }

    return <li data-testid={itemType}>
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
        url: PropTypes.string, // Added url prop validation
        image: PropTypes.string, // Added image prop validation
        name: PropTypes.string,
        popularity: PropTypes.number,
        artistLink: PropTypes.string.isRequired,
        artistName: PropTypes.string, // Added artistName prop validation
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
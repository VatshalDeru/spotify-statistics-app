import { fetchHandler, formatUserData } from "../helper.js";

const userDataParamsObj = {
  itemTypes: ['artists', 'tracks'],
  timeRanges: ['short_term', 'medium_term', 'long_term']
};

export default class SpotifyRequestData {
  // get users data like top listened to artist/tracks
  async getUserData(accessToken) {
    const topArtists = {};
    const topTracks = {};

    const headersObj = {
      Authorization: `Bearer ${accessToken}`,
    };
    let error;
    // loop over userDataParamsObj to fetch user data for their top tracks/artists over long/medium/short (time) term using for loop
    for (const itemType of userDataParamsObj.itemTypes) {
      for (const timeRange of userDataParamsObj.timeRanges) {
        // create the dynamic values/obj so we can pass it to spotifyFetch() for the request
        const url = `https://api.spotify.com/v1/me/top/${itemType}?time_range=${timeRange}`;
        const errorIntro = `error getting user data with itemType: ${itemType} and timeRange: ${timeRange}`;

        const { data, error: errorMsg } = await fetchHandler({
          url,
          headersObj,
          errorIntro,
        });
        
        if (errorMsg) {
          error = errorMsg;
          return;
        }
        const { items } = data;
 
        // adding the fetched user data to the relevant data item obj we created above
        // get only the values we need by calling the format function
        if (itemType === "artists") {
          const formattedArtistItems = formatUserData("artists", items)
          topArtists[timeRange] = formattedArtistItems;
        } else {
          const formattedTrackItems = formatUserData("tracks", items)
          topTracks[timeRange] = formattedTrackItems;
        }
      }
    }
    const { items } = await this.getUserRecentlyPlayed(accessToken);

    const recentlyPlayedTracks = formatUserData("profileData", items);

    const data = {
      topArtists,
      topTracks,
      recentlyPlayedTracks,
    };

    // console.log(topArtists)

    return { data, error };
  }

  // gets users listening history of tracks
  async getUserRecentlyPlayed(accessToken) {
    const url = "https://api.spotify.com/v1/me/player/recently-played";
    const headersObj = {
      Authorization: "Bearer " + accessToken,
    };
    const errorIntro = "error getting users recently played tracks";

    const { data, error } = await fetchHandler({ url, headersObj, errorIntro });
    if (error) return { data, error };

    return data;
  }

  async getUserProfile(accessToken) {
    // prepare values/object for spotifyFetch()
    const url = "https://api.spotify.com/v1/me";
    const headersObj = {
      Authorization: "Bearer " + accessToken,
    };
    const errorIntro = "error getting user profile data";

    return await fetchHandler({ url, headersObj, errorIntro });
    // console.log('apiController.js - getUserProfile(): ', data);
  }

  // get result for query which the user typed in the search bar
  async getSearchedTracks(accessToken, query){
    const url = new URL("https://api.spotify.com/v1/search?");
    url.searchParams.append('q', query);
    url.searchParams.append('type', 'track');
    url.searchParams.append('market', 'ES');
    url.searchParams.append('limit', 5);

    const headersObj = {
      Authorization: "Bearer " + accessToken,
    };
    const errorIntro = 'error getting track search results';
    const { data, error } = await fetchHandler({ url, headersObj})
    if(error) return { data, error };

    const resultTracks = data.tracks.items;
    const formattedResultTracks = resultTracks.map(track => ({
      trackName: track.name,
      trackImage: track.album.images[0].url
    }));
    
    return {data:formattedResultTracks, error}
  }
}

import { fetchHandler } from "../helper.js";

const userDataParamsObj = {
    itemTypes: ['artists', 'tracks'],
    timeRanges: ['short_term', 'medium_term', 'long_term']
};

export default class SpotifyRequestData {
  // function to get users listening statistics
  async getUserData(accessToken) {
    // return await getUserDataHelper(accessToken);
    const topArtists = {};
    const topTracks = {};
    // console.log(accessToken)

    // create and prepare the static values/obj so we can pass it spotifyFetch() for the request
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
        // console.log(items);
        // adding the fetched user data to the relevant data item obj we created above
        if (itemType === "artists") {
          topArtists[timeRange] = items;
        } else {
          topTracks[timeRange] = items;
        }
      }
    }
    const { items: recentlyPlayedTracks } = await this.getUserRecentlyPlayed(accessToken);

    const data = {
      topArtists,
      topTracks,
      recentlyPlayedTracks,
    };

    return { data, error };
  }

  async getUserRecentlyPlayed(accessToken) {
    const url = "https://api.spotify.com/v1/me/player/recently-played";
    const headersObj = {
      Authorization: "Bearer " + accessToken,
    };
    const errorIntro = "error getting users recently played tracks";

    const { data, error } = await fetchHandler({ url, headersObj, errorIntro });
    if (error) return;

    return data;
  }

  // get users spotify profile data
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
}

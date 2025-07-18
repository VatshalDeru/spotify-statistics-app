// we'll loop through this objects arrays to send requests for data
const userDataParamsObj = {
    itemTypes: ['artists', 'tracks'],
    timeRanges: ['short_term', 'medium_term', 'long_term']
}

// get users top artists/tracks for short(4 weeks), medium(6 months), long term(1 year)
export const getUserDataHelper = async (accessToken) =>{
    const topArtists = {};
    const topTracks = {};
    // console.log(accessToken)

    // create and prepare the static values/obj so we can pass it spotifyFetch() for the request
    const headersObj = {
        Authorization : `Bearer ${accessToken}`
    };
    let error;
    // loop over userDataParamsObj to fetch user data for their top tracks/artists over long/medium/short (time) term using for loop
    for(const itemType of userDataParamsObj.itemTypes) {
        for(const timeRange of userDataParamsObj.timeRanges) {
            // create the dynamic values/obj so we can pass it to spotifyFetch() for the request
            const url = `https://api.spotify.com/v1/me/top/${itemType}?time_range=${timeRange}`;
            const errorIntro = `error getting user data with itemType: ${itemType} and timeRange: ${timeRange}`;

            const { data, error:errorMsg } = await spotifyFetch({url, headersObj, errorIntro})
            if(errorMsg) {
                error = errorMsg;
                return;
            }
            const { items } = data
            // console.log(items);
            // adding the fetched user data to the relevant data item obj we created above
            if(itemType === 'artists') {
                topArtists[timeRange] = items;
            } else{
                topTracks[timeRange] = items;
            }
        }
    }
    const { items: recentlyPlayedTracks } = await getUserRecentlyPlayed(accessToken);


    const data ={
        topArtists, 
        topTracks,
        recentlyPlayedTracks
    }

    return {data, error}
}

// get users 20 recently played tracks
export const getUserRecentlyPlayed = async (accessToken) => {
    const url = 'https://api.spotify.com/v1/me/player/recently-played';
    const headersObj = {
        'Authorization' : 'Bearer ' + accessToken
    };
    const errorIntro = 'error getting users recently played tracks'
    
    const { data, error } = await spotifyFetch({ url, headersObj, errorIntro });

    if(error) return;

    return data;
}

// function that will call fetch() for you, help write DRY code
export const spotifyFetch = async ({ url, method, bodyObj, headersObj, errorIntro }) => {
    // conditionally configuring the options object depending on if each option was passed in the parameter or not
    const options = {
        ...(method && {method}),
        ...(headersObj && { headers: headersObj}),
        ...(bodyObj && {body: bodyObj}),
    }

    // general try/catch block that calls fetch(), will be used for all fetch requests in the backend
    try {
        const response = await fetch(url, options);

        if(!response.ok) {
            const errorMsg = await response.text();
            throw new Error(`${errorIntro}, error status: ${response.status}, error message: ${errorMsg}`)
        }

        const data = await response.json();

        // console.log(data);
        return { data, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error};
    }
}

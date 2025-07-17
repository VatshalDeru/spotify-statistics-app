// we'll loop through this objects arrays to send requests for data
const userDataParamsObj = {
    itemTypes: ['artists', 'tracks'],
    timeRanges: ['short_term', 'medium_term', 'long_term']
}

// get users top artists/tracks for short(4 weeks), medium(6 months), long term(1 year)
export const getUserDataHelper = async (accessToken) =>{
    const topArtists = {};
    const topTracks = {};
    console.log(accessToken)

    // create and prepare the static values/obj so we can pass it spotifyFetch() for the request
    const headersObj = {
        Authorization : `Bearer ${accessToken}`
    };
    

    // loop over userDataParamsObj to fetch user data for their top tracks/artists over long/medium/short (time) term using for loop
    for(const itemType of userDataParamsObj.itemTypes) {
        for(const timeRange of userDataParamsObj.timeRanges) {
            // create the dynamic values/obj so we can pass it to spotifyFetch() for the request
            const url = `https://api.spotify.com/v1/me/top/${itemType}?time_range=${timeRange}`;
            const errorIntro = `error getting user data with itemType: ${itemType} and timeRange: ${timeRange}`;

            const {items} = await spotifyFetch({url, headersObj, errorIntro})
            // console.log(items);
            // adding the fetched user data to the relevant data item obj we created above
            if(itemType === 'artists') {
                topArtists[timeRange] = items;
            } else{
                topTracks[timeRange] = items;
            }
            
            // try {
            //     const response = await fetch(`https://api.spotify.com/v1/me/top/${itemType}?time_range=${timeRange}`,{
            //         headers: {
            //             Authorization : `Bearer ${accessToken}`
            //         }
            //     });

            //     if(!response.ok) {
            //         const errorMsg = await response.text();
            //         throw new Error(`error getting user data with itemType: ${itemType} and timeRange: ${timeRange}, error status: ${response.status}, error message: ${errorMsg}`)
            //     }

            //     // get only the array of the top tracks/artits from the received data
            //     const {items} = await response.json();

            //     // adding the fetched user data to the relevant data item obj we created above
            //     if(itemType === 'artists') {
            //         topArtists[timeRange] = items;
            //     } else{
            //         topTracks[timeRange] = items;
            //     }
            // } catch (error) {
            //     console.log(error);
            // }
        }
    }
    const { items: recentlyPlayedTracks } = await getUserRecentlyPlayed(accessToken);

    // console.log('helper.js - getUserData - topArtists: ', topArtists)
    // console.log('helper.js - getUserData - topTracks: ', topTracks)
    // console.log('helper.js - getUserData - recentlyPlayedTracks: ', recentlyPlayedTracks)
    
    return {topArtists, topTracks, recentlyPlayedTracks}
}

// get users 20 recently played tracks
export const getUserRecentlyPlayed = async (accessToken) => {
    const url = 'https://api.spotify.com/v1/me/player/recently-played';
    const headersObj = {
        'Authorization' : 'Bearer ' + accessToken
    };
    const errorIntro = 'error getting users recently played tracks'
    
    const data = await spotifyFetch({ url, headersObj, errorIntro });

    return data;
}

// function that will call fetch() for you, help write DRY code
export const spotifyFetch = async ({ url, method, bodyObj, headersObj, errorIntro }) => {
    // conditionally configuring the options object depending on if each option was passed in the parameter or not
    const options = {
        ...(method && {method: method}),
        ...(headersObj && { headers: headersObj}),
        ...(bodyObj && {body: bodyObj}),
    }
    // console.log('helper.js - spotifyFetch():', options);

    // general try/catch block that calls fetch(), will be used for all fetch requests in the backend
    try {
        const response = await fetch(url, options);

        if(!response.ok) {
            const errorMsg = await response.text();
            throw new Error(`${errorIntro}, error status: ${response.status}, error message: ${errorMsg}`)
        }

        const data = await response.json();

        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

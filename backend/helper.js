// function that will call fetch() for you, help write DRY code
export const fetchHandler = async ({ url, method, bodyObj, headersObj, errorIntro }) => {
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

export const formatUserData = (itemType, items) =>{
    if (itemType === "artists") {
        return items.map(artist => ({
        artistsLink: artist.external_urls.spotify,
        image: artist.images[0].url,
        artistName: artist.name,
        artistPopularity: artist.popularity,
        followers: artist.followers.total,
        }))
    } else if(itemType === "tracks"){
        return items.map(track => ({
            trackLink: track.external_urls.spotify,
            image: track.album.images[0].url,
            trackName: track.name,
            trackPopularity: track.popularity,
            artists: track.artists
        }))
    } else if(itemType === "profileData"){
        return items.map(recentTrack => ({
            trackLink: recentTrack.track.external_urls.spotify,
            image: recentTrack.track.album.images[0].url,
            trackName: recentTrack.track.name,
            artists: recentTrack.track.artists,
            trackPopularity: recentTrack.track.popularity,
            timeStamp: recentTrack.played_at,
        }))
    }
};
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://localhost:3000/callback',
  clientId: '31efb33b062d4da9a45cb8f69e7cf34d',
  clientSecret: '21c9d39137cb440b9898877d15d510e7',
});

const scope = ['playlist-read-private', 'user-read-recently-played', 'user-top-read' ];

// generates the URL required to which the user needs to be redirected to get the auth code
export const getAuthUrl = () => spotifyApi.createAuthorizeURL(scope);

// uses the auth code to request tokens
export const getToken = async (authCode) => {
    const response = await spotifyApi.authorizationCodeGrant(authCode);

    const accessToken = response.body['access_token'];
    const refreshToken = response.body['refresh_token'];
    const expiresIn = response.body['expires_in']

    console.log(accessToken);
    return {
        accessToken,
        refreshToken,
        expiresIn
    };
}

// fetches either users top tracks or artists depending on the type provided and also the timerange
export const getUserData = async (accessToken, type, timeRange) => {
    console.log(accessToken)
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}`,{
            headers: {
                Authorization : `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('error getting user info');
    }
};

// gets users last listened to tracks (20 tracks max)
export const getUserListeningHistory = async (accessToken) => {
    
}

// gets users current profile info on spotify
export const getUserProfile = async (accessToken) => {
    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })

        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error(error)
    }
}
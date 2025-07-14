import { getUserDataHelper, spotifyFetch } from "../helper.js";

export default class SpotifyAPIController {
    constructor({client_id, client_secret, redirect_uri}) {
        this.accessToken = '';
        this.refreshToken = '';
        this.client_id = client_id || '';
        this.client_secret = client_secret || '';
        this.redirect_uri = redirect_uri || '';
    }

    // ------ getter and setter functions ---------
    getAccessToken() {
        // console.log('getting accessToken: ', this.accessToken)
        return this.accessToken;
    }

    getRefreshToken() {
        return this.refreshToken;
    }

    setAccessToken(token) {
        this.accessToken = token;
        console.log('access token set to: ', this.accessToken)
    }

    setRefreshToken(token) {
        this.refreshToken = token;
        console.log('refresh token set to: ', this.refreshToken)
    }
    // ---------------------------------------------

    // create the URL to authenticate user to obtain authcode
    getAuthURL(givenScope){
        const scope = givenScope || ['playlist-read-private', 'user-read-recently-played', 'user-top-read,', 'user-read-private', 'user-read-email' ];
        
        const baseURL = 'https://accounts.spotify.com/authorize?'

        try {
            // create the query params for the auth URL
            const params = new URLSearchParams({
                response_type: 'code',
                client_id: this.client_id,
                scope: scope,
                redirect_uri: this.redirect_uri,
            })

            // comnine base URL + params to create the auth URL
            const authURL = baseURL + params.toString();

            return authURL;
        } catch (error) {
            throw new Error('hey',error);
        }
    }

    // get access & refresh tokens using the authcode
    async getTokens(authCode){
        // prepare values/object for spotifyFetch()
        const url = 'https://accounts.spotify.com/api/token';
        const method = 'POST';
        const bodyObj = new URLSearchParams({
            redirect_uri: this.redirect_uri,
            code: authCode,
            grant_type: 'authorization_code'
        })
        const headersObj = {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(this.client_id + ':' + this.client_secret).toString('base64'))
        };
        const errorIntro = 'error getting tokens'

        const {access_token, refresh_token} = await spotifyFetch({url, method, bodyObj, headersObj, errorIntro})
        
        //set the tokens in this class for later use
        this.setAccessToken(access_token);
        this.setRefreshToken(refresh_token);

        return { access_token }
    }

    // function to get users listening statistics 
    async getUserData(){
        return await getUserDataHelper(this.accessToken); 
    };

    // get users spotify profile data
    async getUserProfile(){
        // prepare values/object for spotifyFetch()
        const url = 'https://api.spotify.com/v1/me';
        const headersObj = {
            Authorization: "Bearer " + this.getAccessToken()
        };
        const errorIntro = 'error getting user profile data';

        const data = await spotifyFetch({url, headersObj, errorIntro});
        // console.log('apiController.js - getUserProfile(): ', data);

        return data;
    }
}
import { fetchHandler } from "../helper.js";
import { nanoid } from "nanoid";



export default class SpotifyAuthService{ 
    #accessToken = '';
    #refreshToken = '';
    #client_id = '';
    #client_secret = '';
    #redirect_uri = '';
    #state = '';

    constructor({client_id, client_secret, redirect_uri}) {
        this.#client_id = client_id || '';
        this.#client_secret = client_secret || '';
        this.#redirect_uri = redirect_uri || '';
    }

    // ------ getter and setter functions ---------
    getAccessToken() {
        return this.#accessToken;
    }

    getRefreshToken() {
        return this.#refreshToken;
    }

    getState() {
        return this.#state;
    }

    setAccessToken(token) {
        this.#accessToken = token;
        // console.log('access token set to: ', this.#accessToken)
    }

    setRefreshToken(token) {
        this.#refreshToken = token;
        // console.log('refresh token set to: ', this.#refreshToken)
    }

    // ---------------------------------------------

    // create the URL to authenticate user to obtain authcode
    getAuthURL(givenScope){
        // scope to determine what data we can request from API
        const scope = givenScope;
        
        const baseURL = 'https://accounts.spotify.com/authorize?';

        const state = nanoid(16);
        this.#state = state;

        // create the query params for the auth URL
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: this.#client_id,
            scope: scope,
            redirect_uri: this.#redirect_uri,
            state: state,
        })

        // comnine base URL + params to create the auth URL
        const authURL = baseURL + params.toString();

        return { authURL };
    }

    // get access & refresh tokens using the authcode
    async getTokens(authCode){
        // prepare values/object for spotifyFetch()
        const url = 'https://accounts.spotify.com/api/token';
        const method = 'POST';
        const bodyObj = new URLSearchParams({
            redirect_uri: this.#redirect_uri,
            code: authCode,
            grant_type: 'authorization_code'
        })
        const headersObj = {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(this.#client_id + ':' + this.#client_secret).toString('base64'))
        };
        const errorIntro = 'error getting tokens';

        let { data, error } = await fetchHandler({url, method, bodyObj, headersObj, errorIntro})
        if(error) {
            return { data, error }
        }
        
        const { access_token, refresh_token } = data;
        this.setAccessToken(access_token);
        this.setRefreshToken(refresh_token);

        data =  {
            access_token
        }

        return { data, error }
    }

    // get a fresh accesstoken in exchange for a refreshToken
    async refreshAccessToken(){
        const url = 'https://accounts.spotify.com/api/token';
        const method = 'POST';
        const headersObj = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(this.#client_id + ':' + this.#client_secret).toString('base64'))
        };
        const bodyObj = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: this.#refreshToken,
        });
        const errorIntro = 'error refreshing token'

        let { data, error } = await fetchHandler({ url, method, headersObj, bodyObj, errorIntro });
        
        if(error) {
            return { data, error }
        }
        
        const { access_token } = data;
        this.setAccessToken(access_token);
        
        // create new time of when access token was received
        const tokenCreationTime = Date.now();
        data = { access_token, tokenCreationTime};

        return { data, error };
    }
}
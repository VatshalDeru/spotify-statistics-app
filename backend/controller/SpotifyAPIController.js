import SpotifyRequestData from "./SpotifyRequestData.js";
import SpotifyAuthService from "./SpotifyAuthService.js";

import { getUserDataHelper, spotifyFetch } from "../helper.js";


export default class SpotifyAPIController {
    #authService;
    #requestData = null;

    constructor({client_id, client_secret, redirect_uri}) {
        this.#authService = new SpotifyAuthService({client_id, client_secret, redirect_uri})
    }

    // ------ getter and setter functions ---------
    getAccessToken() {
        return this.#authService.getAccessToken();
    }

    getRefreshToken() {
        return this.#authService.getRefreshToken();
    }

    setAccessToken(token) {
        this.#authService.setAccessToken(token)
    }

    setRefreshToken(token) {
        this.#authService.setRefreshToken(token);
    }
    // ---------------------------------------------

    // create the URL to authenticate user to obtain authcode
    getAuthURL(givenScope){
        // const scope = givenScope || ['playlist-read-private', 'user-read-recently-played', 'user-top-read,', 'user-read-private', 'user-read-email' ];
        
        // const baseURL = 'https://accounts.spotify.com/authorize?';

        // const state = nanoid(16);

        // // create the query params for the auth URL
        // const params = new URLSearchParams({
        //     response_type: 'code',
        //     client_id: this.#client_id,
        //     scope: scope,
        //     redirect_uri: this.#redirect_uri,
        //     state: state,
        // })

        // // comnine base URL + params to create the auth URL
        // const authURL = baseURL + params.toString();
        // // console.log(authURL)

        // return { authURL, state };
        return this.#authService.getAuthURL(givenScope);
    }

    // get access & refresh tokens using the authcode
    async getTokens(authCode){
        const { data, error } = await this.#authService.getTokens(authCode);
        console.log(data)
        if(error) return { data, error };
        else if (data && !this.#requestData) {
            const accessToken = this.#authService.getAccessToken();
            this.#requestData = new SpotifyRequestData(accessToken)
        }
        return { data, error }
    }

    // get a fresh accesstoken in exchange for a refreshToken
    async refreshAccessToken(){
        return await this.#authService.refreshAccessToken();
    }

    // function to get users listening statistics 
    async getUserData(){
        return await this.#requestData.getUserData();
    };

    // get users spotify profile data
    async getUserProfile(){
        return await this.#requestData.getUserProfile();
    }
}
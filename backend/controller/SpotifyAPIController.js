import SpotifyRequestData from "./SpotifyRequestData.js";
import SpotifyAuthService from "./SpotifyAuthService.js";

export default class SpotifyAPIController {
    #authService;
    #requestData = null;

    constructor({client_id, client_secret, redirect_uri}) {
        this.#authService = new SpotifyAuthService({client_id, client_secret, redirect_uri})
        this.#requestData = new SpotifyRequestData();
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
    
    // get auth URL at which the user will authorize the app
    getAuthURL(givenScope){
        return this.#authService.getAuthURL(givenScope);
    }

    // get access & refresh tokens using the authcode
    async getTokens(authCode){
        const { data, error } = await this.#authService.getTokens(authCode);

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
        const accessToken = this.#authService.getAccessToken()
        return await this.#requestData.getUserData(accessToken);
    };

    // get users spotify profile data
    async getUserProfile(){
        const accessToken = this.#authService.getAccessToken()
        return await this.#requestData.getUserProfile(accessToken);
    }
}
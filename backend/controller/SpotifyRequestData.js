import { getUserDataHelper, spotifyFetch } from "../helper.js";

export default class SpotifyRequestData{
    #accessToken = '';
    constructor(accessToken){
        this.#accessToken = accessToken;
    }

    // function to get users listening statistics 
    async getUserData(){
        return await getUserDataHelper(this.#accessToken); 
    };

    // get users spotify profile data
    async getUserProfile(){
        // prepare values/object for spotifyFetch()
        const url = 'https://api.spotify.com/v1/me';
        const headersObj = {
            Authorization: "Bearer " + this.#accessToken
        };
        const errorIntro = 'error getting user profile data';

        return await spotifyFetch({url, headersObj, errorIntro});
        // console.log('apiController.js - getUserProfile(): ', data);
    }
}
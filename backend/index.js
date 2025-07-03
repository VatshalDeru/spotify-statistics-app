import express from "express";
import bodyParser from "body-parser";
import SpotifyWebApi from "spotify-web-api-node";
import 'dotenv/config'

// console.log(process.env.CLIENT_iD)
import { getToken, getAuthUrl, getUserData, getUserProfile } from "./helper.js";

const app = express();
const port = 3000;

// allowed me to receive the access tokens in the backend through body, that i sent from frontend
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // when i tried to send access token from frontend to backend for fetching user data
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    ); 
    next();
});

app.get('/login', (req, res) => {
    const authUrl = getAuthUrl();
    console.log(authUrl)

    res.json(authUrl);
})

app.get('/callback', async (req, res) => {
    try {
        const authCode = req.query.code;
        const tokenObj = await getToken(authCode);

        console.log(tokenObj)
        res.redirect(`http://localhost:5173/?access_token=${tokenObj.accessToken}&refresh_token=${tokenObj.refreshToken}&expires_in=${tokenObj.expiresIn}`)
    } catch (error) {
        console.log(error)
    }
})

app.post('/userData', async (req, res) => {
    const { accessToken } = req.body;

    // const userData = await getUserData(accessToken, 'tracks', 'short_term');

    const userProfile = await getUserProfile(accessToken);

    res.json(userProfile)

})

app.listen(port, () => console.log(`Listening on port: ${port}`))
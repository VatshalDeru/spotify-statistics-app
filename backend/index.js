import express from "express";
import bodyParser from "body-parser";
import SpotifyWebApi from "spotify-web-api-node";
import 'dotenv/config'
import SpotifyAPIController from "./controller/SpotifyAPIController.js";

// console.log(process.env.CLIENT_iD)
// import { getAuthUrl} from "./helper.js";

const app = express();
const port = 3000;

// allowed me to receive the access tokens in the backend through body, that i sent from frontend
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// initialise the controller
const spotifyAPIController = new SpotifyAPIController({
  redirect_uri: 'http://localhost:3000/callback',
  client_id: '31efb33b062d4da9a45cb8f69e7cf34d',
  client_secret: '21c9d39137cb440b9898877d15d510e7',
});


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
    const authUrl = spotifyAPIController.getAuthURL();
    // console.log('authURL: ', authUrl)

    res.json(authUrl);
})

app.get('/callback', async (req, res) => {
    try {
        const authCode = req.query.code;
        await spotifyAPIController.getTokens(authCode);

        // get user profile info

        res.redirect('http://localhost:5173/')
    } catch (error) {
        console.log('index.js - /callback: ', error)
    }
})

app.post('/user', async (req, res) => {
    const { action } = req.body;
    let data;
    if(action === 'userData') {
        data = await spotifyAPIController.getUserData('tracks', 'long_term');
    } else if (action === 'userProfile') {
        data = await spotifyAPIController.getUserProfile();
    }

    console.log(data)

    res.json(data)
})

app.listen(port, () => console.log(`Listening on port: ${port}`))
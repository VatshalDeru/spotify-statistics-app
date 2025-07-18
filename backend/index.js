import express from "express";
import bodyParser from "body-parser";
import SpotifyWebApi from "spotify-web-api-node";
import 'dotenv/config'
import SpotifyAPIController from "./controller/SpotifyAPIController.js";

// console.log(process.env.CLIENT_iD)

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
    res.setHeader('Access-Control-Allow-Headers','content-type'); 
    next();
});

app.get('/login', (req, res) => {
    const { authURL, state } = spotifyAPIController.getAuthURL();

    // also sending state to be sent to frontend so we can compare state later
    res.json({ authURL, state });
})

app.get('/callback', async (req, res) => {
    const state = req.query.state;
    // console.log('state', state)
    const homeURL = new URL('http://localhost:5173/')
    homeURL.searchParams.append('state', state)
    try {
        if(req.query.error) {
            throw new Error(`error authorizing app : ${req.query.error}`)
        }

        const authCode = req.query.code;
        const { data, error } = await spotifyAPIController.getTokens(authCode);
        
        const { access_token } = data;
        // console.log(data)

        if(error){
            throw new Error(error);
        }

        // get the time the access token was received 
        const tokenGeneratedAt = new Date();

        // add access token and time tokens were received in the URL as query params
        homeURL.searchParams.append('tokenCreationTime', tokenGeneratedAt.getTime().toString())
        homeURL.searchParams.append('access_token', access_token)

        res.redirect(homeURL)
    } catch (error) {
        console.log(error.message);
        homeURL.searchParams.append('error', error.message)
        res.redirect(homeURL)
    }
})

// process request for users listening and users profile data
app.post('/user', async (req, res) => {
    const { action, accessToken } = req.body;
    let data;
    let error;

    console.log(accessToken === spotifyAPIController.getAccessToken())

    // return status 400 if provided an invalid token
    if(accessToken !== spotifyAPIController.getAccessToken()){
        return res.status(400).json({ error: 'Invalid token provided'});
    }

    if(action === 'userListeningData') {
        ({data, error} = await spotifyAPIController.getUserData());
    } else if (action === 'userProfile') {
        ({data, error} = await spotifyAPIController.getUserProfile());
    }

    if(error){
        console.log(error)
        return res.status(400).json({ error: error.message })
    }

    return res.json(data);
})

app.get('/refresh-token', async (req, res) => {
    const { data:accessToken, error} = await spotifyAPIController.refreshAccessToken();

    if(error){
        console.log(error)
        return res.status(400).json({ error: error.message })
    }

    res.json(accessToken);
})

app.listen(port, () => console.log(`Listening on port: ${port}`))
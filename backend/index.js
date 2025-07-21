import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import SpotifyAPIController from "./controller/SpotifyAPIController.js";

// console.log(process.env.CLIENT_iD)

const app = express();
const port = 3000;

app.use(bodyParser.json());

// initialise the controller
const spotifyAPIController = new SpotifyAPIController({
  redirect_uri: "http://localhost:3000/callback",
  client_id: "31efb33b062d4da9a45cb8f69e7cf34d",
  client_secret: "21c9d39137cb440b9898877d15d510e7",
});

const scope = [
  "user-read-recently-played",
  "user-top-read,",
  "user-read-private",
  "user-read-email",
];

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  next();
});

app.get("/login", (req, res) => {
  const { authURL, state } = spotifyAPIController.getAuthURL(scope);

  // also sending state to be sent to frontend so we can compare state later
  res.json({ authURL, state });
});

app.get("/callback", async (req, res) => {
  const state = req.query.state;

  const homeURL = new URL("http://localhost:5173/");
  homeURL.searchParams.append("state", state);

  try {
    if (req.query.error) {
      throw new Error(`error authorizing app : ${req.query.error}`);
    }

    const authCode = req.query.code;
    const { data, error } = await spotifyAPIController.getTokens(authCode);

    if (error) {
      throw new Error(error);
    }

    const { access_token } = data;

    // get the time the access token was received
    const tokenGeneratedAt = Date.now();

    // add access token and time tokens were received in the URL as query params
    homeURL.searchParams.append("tokenCreationTime", tokenGeneratedAt);
    homeURL.searchParams.append("access_token", access_token);

    res.redirect(homeURL);
  } catch (error) {
    console.log(error.message);
    homeURL.searchParams.append("error", error.message);
    res.redirect(homeURL);
  }
});

app.post("/user", async (req, res) => {
  const { action, accessToken } = req.body;
  let data;
  let error;

  // return status 400 if provided an invalid token
  if (accessToken !== spotifyAPIController.getAccessToken()) {
    return res.status(400).json({ error: "Invalid token provided" });
  }

  if (action === "userListeningData") {
    ({ data, error } = await spotifyAPIController.getUserData());
  } else if (action === "userProfileData") {
    ({ data, error } = await spotifyAPIController.getUserProfile());
  }

  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
});

app.get("/refresh-token", async (req, res) => {
  const { data, error } = await spotifyAPIController.refreshAccessToken();

  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.listen(port, () => console.log(`Listening on port: ${port}`));

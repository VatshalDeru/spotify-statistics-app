import { refreshAccessToken } from "./http";

// check for params from the URL after auth redirection and store it in localstorage if present
export const checkURLforParams = () => {
  const params = new URLSearchParams(window.location.search);

  const stateMismatch =  checkForStateMismatch(params);
  if(stateMismatch) return { status: 'error' };


  // check if a error param is present in the URL and stop function if so
  const error = params.get("error");
  if (error) {
    console.error("error logging in : ", error);

    window.history.replaceState(null, "", "/");

    // for notification
    return { status: "error" };
  }

  // no longer need to store state
  localStorage.removeItem("state");

  const tokenCreationTime = params.get("tokenCreationTime");
  const accessToken = params.get("access_token");


  // checking if the user has made no login attempt
  if (!tokenCreationTime || !accessToken) return { status: "neutral" };

  localStorage.setItem("tokenCreationTime", parseInt(tokenCreationTime));
  localStorage.setItem("accessToken", accessToken);

  // reset URL to root path to remove token and time from the URL without reloading page
  window.history.replaceState(null, "", "/");

  // for notification
  return { status: "success" };
};

// check if the state received in the URL params ins
const checkForStateMismatch = (params) => {
  const storedState = localStorage.getItem("state");
  const receivedState = params.get("state");

  // check for state misatch if state is stored in localStorage and we receive state in URL params
  if (storedState !== receivedState && storedState && receivedState) {
    console.error("error logging in: state mismatch");

    // remove the state to avoid repeated misatch errors in the console upon page refresh
    localStorage.removeItem("state");

    window.history.replaceState(null, "", "/");

    // for notification
    return true;
  }
};

const storeParamsInStorage = () =>{
  const tokenCreationTime = params.get("tokenCreationTime");
  const accessToken = params.get("access_token");
  if (!tokenCreationTime || !accessToken) return false;

  localStorage.setItem("tokenCreationTime", parseInt(tokenCreationTime));
  localStorage.setItem("accessToken", accessToken);
  return true;
}

export const checkIsLoggedIn = () => {
  let isLoggedin = true;

  const isTokenFresh = checkTokenIsFresh();
  const accesstoken = localStorage.getItem("accessToken");

  if (!isTokenFresh || !accesstoken) {
    isLoggedin = false;
    clearStorage();
  }

  return isLoggedin;
};

export const checkTokenIsFresh = () => {
  const tokenCreationTime = localStorage.getItem("tokenCreationTime");

  if (!tokenCreationTime) return null;

  const currTime = new Date().getTime();
  const timeDifference = (currTime - tokenCreationTime) / 1000;
  // console.log('util.js - checkTokenIsExpired() - timeDifference: ', timeDifference);

  const tokenIsFresh = timeDifference < 3600;

  return tokenIsFresh;
};

export const clearStorage = () => {
  localStorage.removeItem("tokenCreationTime");
  localStorage.removeItem("accessToken");
};

// function to ensure we automatically get fresh access tokesn when it expires
// returns false/true depending on if it refreshed sucessfully
export const ensureFreshToken = async () => {
  const isTokenFresh = checkTokenIsFresh();
  console.log('isTokenFresh: ', isTokenFresh)
  if (!isTokenFresh) {
    const refreshed = await refreshAccessToken();

    if (!refreshed) {
      console.error("error refreshing access token");
      return false;
    }
    console.log("token refreshed");
  }

  return true;
};

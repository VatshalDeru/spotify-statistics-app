import { refreshAccessToken } from "./http";

// check for params from the URL after auth redirection and store it in localstorage if present
export const checkURLforParams = () => {
  const params = new URLSearchParams(window.location.search);

  // check if a error param is present in the URL and stop function if so
  const error = params.get("error");
  if (error) {
    console.error("error logging in : ", error);

    window.history.replaceState(null, "", "/");

    // for notification
    return { status: "error" };
  }


  const storedParams = storeParamsInStorage(params);
  if(!storedParams) return { status: "neutral" }; // neutral means login wasn't attempted

  // reset URL to root path to remove token and time from the URL without reloading page
  window.history.replaceState(null, "", "/");

  // for notification
  return { status: "success" };
};


const storeParamsInStorage = (params) =>{
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

  if (!tokenCreationTime) return false;

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

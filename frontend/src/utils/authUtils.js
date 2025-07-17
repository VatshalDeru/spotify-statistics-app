import { refreshAccessToken } from "./http";

// check for params from the URL after auth redirection and store it in localstorage if present
export const storeDataFromParams = () => {
  const params = new URLSearchParams(window.location.search);

  const storedState = localStorage.getItem('state');
  const receivedState = params.get('state');

  // check for state misatch if state is stored in localStorage and we receive state in URL params
  if(storedState !== receivedState && storedState && receivedState) {
    console.error('error logging in: state mismatch');

    // remove the state to avoid repeated misatch errors in the console upon page refres
    localStorage.removeItem('state')

    // redirect user back to root path to clear the params in the URL
    window.history.replaceState(null, '', '/');
    // return error so we can access this in components to show Notification compoenent
    return { status: 'error'} ;
  }
  
  // check if a error param is present in the URL and stop function if so
  const error = params.get('error')
  if(error) {
    console.error('error logging in : ', error);
    
    // redirect user back to root path to clear the params in the URL
    window.history.replaceState(null, '', '/');
    
    return { status: 'error'};
  }

  // get the time the token was received in the backend and access token from the URL query params
  const tokenCreationTime = params.get('tokenCreationTime')
  const accessToken = params.get('access_token')
  
  // remove the state from localStorage as we no longer need it  
  localStorage.removeItem('state')
  
  // checking if the user has made no login attempt
  const paramsInURL = tokenCreationTime && accessToken;
  if(!paramsInURL ) return { status: 'neutral'};

  // log error in console if the tokenCreationTime is not a number
  if(isNaN(parseInt(tokenCreationTime)) && tokenCreationTime) {
    console.error('Invalid tokenCreationTime', tokenCreationTime, typeof tokenCreationTime);
  }

  // store params in localStorage for later use
  localStorage.setItem('tokenCreationTime', parseInt(tokenCreationTime))
  localStorage.setItem('accessToken', accessToken)

  // reset URL to root path to remove token and time from the URL without reloading page 
  window.history.replaceState(null, '', '/');

  // return success state if we get params from URL and store it in localStorage
  return { status: 'success'}
}

export const checkIsLoggedIn = () => {
  let isLoggedin = true;

  const isTokenFresh = checkTokenIsFresh();
  const accesstoken = localStorage.getItem('accessToken');

  if(!isTokenFresh || !accesstoken) {
    isLoggedin = false;
    handleLogout();
  }

  return isLoggedin;
};

export const checkTokenIsFresh = () => {
  const tokenCreationTime = localStorage.getItem('tokenCreationTime');

  if(!tokenCreationTime) return null;

  const currTime  = new Date().getTime();
  const timeDifference = (currTime - tokenCreationTime) / 1000;
  // console.log('util.js - checkTokenIsExpired() - timeDifference: ', timeDifference);

  const tokenIsFresh = timeDifference < 3600;

  return tokenIsFresh;
}

export const handleLogout = () => {
  localStorage.removeItem('tokenCreationTime');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('state');
};

// function to ensure we automatically get fresh access tokesn when it expires
// will return false if failed to refresh access token
export const ensureFreshToken = async () => {
  const isTokenFresh = checkTokenIsFresh();
  // console.log('isTokenFresh: ', isTokenFresh)
  if(!isTokenFresh) {
      const refreshed = await refreshAccessToken();

      if(!refreshed) {
          console.error('error refreshing access token');
          return false;
      }
      console.log('token refreshed')
  }
  
  return true;
}
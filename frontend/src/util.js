// we get the time of token creation and access token from the query params of URL and store it in local storage
// we will use this time to calculate if tokens have expired or not before each request we make
export const storeDataFromParams = () => {
  const params = new URLSearchParams(window.location.search);

  // get the time the token was received in the backend from the URL query params
  const tokenCreationTime = params.get('tokenCreationTime');

  // get the access token from the URL query params
  const accessToken = params.get('access_token')


  // console.log(tokenCreationTime, typeof parseInt(tokenCreationTime))

  if(!tokenCreationTime || !accessToken) return;

  localStorage.setItem('tokenCreationTime', parseInt(tokenCreationTime))
  localStorage.setItem('accessToken', accessToken)
  window.location.replace('http://localhost:5173/')
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
}

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
  // window.location.reload();
};

export const getDisplayConfigText= (key) => {
  switch(key) {
    case 'topArtists' : return 'Top Artists'
    case 'topTracks' : return 'Top Tracks'
    case 'recentlyPlayedTracks' : return 'Recently Played'
    case 'short_term' : return '4 Weeks'
    case 'medium_term' : return '6 Months'
    case 'long_term' : return '12 Months'
  }
}
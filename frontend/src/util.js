// we get the time of token creation and access token from the query params of URL and store it in local storage
// we will use this time to calculate if tokens have expired or not before each request we make
export const storeDataFromParams = () => {
  const params = new URLSearchParams(window.location.search);

  const storedState = localStorage.getItem('state');
  const receivedState = params.get('state');

  // check if the state we got in the URL matches the one we have stored in localStorage
  // only performing this check if we have 'state' value in localStorage and we aren't at root path
  if(storedState !== receivedState && storedState && window.location.href !== 'http://localhost:5173/') {
    console.error('error logging in: state mismatch');

    // remove the state to avoid repeated misatch errors in the console upon errors
    localStorage.removeItem('state')

    // redirect user back to root path to clear the params in the URL
    window.history.replaceState(null, '', '/');
    return;
  }

  const error = params.get('error')

  // check if a error param is present in the URL and stop function if so
  if(error) {
    console.error('error logging in : ', error);
    
    // redirect user back to root path to clear the params in the URL
    window.history.replaceState(null, '', '/');
    return;
  }

  // get the time the token was received in the backend from the URL query params
  const tokenCreationTime = params.get('tokenCreationTime');

  
  // get the access token from the URL query params
  const accessToken = params.get('access_token')
  
  // remove the state from localStorage as we no longer need it  
  localStorage.removeItem('state')
  
  // console.log(tokenCreationTime, typeof parseInt(tokenCreationTime))
  
  if(!tokenCreationTime || !accessToken) return;
  
  // log error in console if the tokenCreationTime is not a number
  if(isNaN(parseInt(tokenCreationTime)) && tokenCreationTime) {
    console.error('Invalid tokenCreationTime', tokenCreationTime, typeof tokenCreationTime);
  }

  localStorage.setItem('tokenCreationTime', parseInt(tokenCreationTime))
  localStorage.setItem('accessToken', accessToken)

  // reset URL to root path to remove token and time from the URL without reloading page 
  window.history.replaceState(null, '', '/');
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
  localStorage.removeItem('state');
  // window.location.reload();
};

// function takes a selectedConfig property value and returns a value we can display in the UI
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

// formate large numbers to add commmas at every 3 digits
export const formatNumberWithCommas = (num) => {
  const numString = num.toString().split('');
  let counter = 0;

  for(let i = numString.length-1; i >= 0; i--) {
    const isMod3 = (counter % 3 === 0);
    if(isMod3 && i !== numString.length-1) {
      numString.splice(i+1, 0, ',')
    }
    counter++;
  }

  return numString.join('')
}

// function returns date in a user friendly and readable format
export const formatDate = (rawDate) => {
  // const isoDate = date;
  const date = new Date(rawDate);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  const dataString = `${day}/${month}/${year} at ${hour}:${minutes}`
  console.log(dataString)
  // console.log(formattedDate.getUtc)
  // console.log(formattedDate.toString().slice(0, -34));
  return dataString;
}

// format header displayed in UserDataList compponent depening on the data type and time range
export const createDataListHeader = (dataType, timeRange) => {
  if(dataType === 'recentlyPlayedTracks') return 'Recently Played Tracks';

  // log error if either the data or timeRange are not passed in
  if(!dataType || !timeRange) {
    console.error('incorect dataType and timeRange provided.');
    return;
  }

  let headerString = '';

  // append the string unique to each data Type
  switch(dataType) {
    case 'topArtists':
      headerString += 'Top Artists';
      break;
    case 'topTracks':
      headerString += 'Top Tracks'
      break;
  }

  headerString += ' in the last ';

  // append the string unique to each time range
  switch(timeRange) {
    case 'short_term':
      headerString += '4 weeks';
      break;
    case 'medium_term':
      headerString += '6 months';
      break;
    case 'long_term':
      headerString += '12 months';
      break;
  }

  return headerString;
}
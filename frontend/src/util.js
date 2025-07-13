// we get the time of token creation from the query params of URL and store it in local storage
// we will use this time to calculate if tokens have expired or not before each request we make
export const storeDateFromParams = () => {
  const params = new URLSearchParams(window.location.search);
  const tokenCreationTime = params.get('tokenCreationTime');
  // console.log(tokenCreationTime, typeof parseInt(tokenCreationTime))

  if(!tokenCreationTime) return;

  localStorage.setItem('tokenCreationTime', parseInt(tokenCreationTime))
  window.location.replace('http://localhost:5173/')
}

export const checkTokenIsFresh = () => {
  const tokenCreationTime = localStorage.getItem('tokenCreationTime');

  if(!tokenCreationTime) return null;

  const currTime  = new Date().getTime();
  const timeDifference = (currTime - tokenCreationTime) / 1000;
  // console.log('util.js - checkTokenIsExpired() - timeDifference: ', timeDifference);

  const tokenIsFresh = timeDifference < 3600;

  if(!tokenIsFresh) handleLogout(tokenIsFresh);

  return tokenIsFresh;
}

export const handleLogout = () => {
  localStorage.removeItem('tokenCreationTime');
  window.location.reload();
};


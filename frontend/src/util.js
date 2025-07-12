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

export const checkTokenIsExpired = () => {
  const tokenCreationTime = localStorage.getItem('tokenCreationTime');
  const currTime  = new Date().getTime();
  const timeDifference = (currTime - tokenCreationTime) / 1000;
  // console.log('util.js - checkTokenIsExpired() - timeDifference: ', timeDifference);

  const tokenHasExpired = timeDifference >= 3600;

  if(tokenHasExpired) handleLogout(tokenHasExpired);

  return tokenHasExpired;
}

const handleLogout = () => {
  localStorage.removeItem('tokenCreationTime');
};

export const checkIsLoggedIn = () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const expiresIn = localStorage.getItem('expires_in');

    if(accessToken && refreshToken && expiresIn) return true
    else return false;
}

// gets user profile details
export const getUserProfileHandler = async () => {
  try {

    // console.log('sdf')
    const response = await fetch('http://localhost:3000/user', 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'userProfile' })
      }
    );
    
    if(!response.ok) {
      const errorMsg = await response.text();
      throw new Error(`error getting user profile data, error status: ${response.status}, error message: ${errorMsg}`)
    }

    // console.log(response);
    const data  = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error)
  }
}
// gets user data statistics
export const getUserDataHandler = async () => {
  try {
    const response = await fetch('http://localhost:3000/user', 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'userData' })
      }
    );
    console.log(response);

    if(!response.ok) {
      const errorMsg = await response.text();
      throw new Error(`error getting user data, error status: ${response.status}, error message: ${errorMsg}`)
    }

    const data  = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error)
  }
}
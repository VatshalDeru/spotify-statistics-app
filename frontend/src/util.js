// we get the access token, refresh token and expiry timer from the URL PARAM
export const storeTokensFromParams = () => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const expiresIn = params.get('expires_in');

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    }

    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    
    if (expiresIn) {
      localStorage.setItem('expires_in', expiresIn);
    }

    if(accessToken || refreshToken || expiresIn) window.location.replace('http://localhost:5173/');
}

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
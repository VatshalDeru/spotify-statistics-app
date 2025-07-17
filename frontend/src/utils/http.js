import { checkTokenIsFresh } from "./authUtils";

// function will send fetch request for you with values and data provided
const spotifyFetch = async ({ url, method, bodyObj, headersObj, errorIntro }) => {
    // conditionally configuring the options object depending on if each option was passed in the parameter or not
    const options = {
        ...(method && {method}),
        ...(headersObj && { headers: headersObj}),
        ...(bodyObj && {body: bodyObj}),
    }
    
    // general try/catch block that calls fetch(), will be used for all fetch requests in the backend
    try {
        const response = await fetch(url, options);

        if(!response.ok) {
            const errorMsg = await response.text();
            throw new Error(`${errorIntro}, error status: ${response.status}, error message: ${errorMsg}`)
        }

        const data = await response.json();

        // console.log(data);
        return { data, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error};
    }
}

// gets user profile details
export const getUserProfileHandler = async () => { 
    const url = 'http://localhost:3000/user';
    const method = 'POST';
    const headersObj = { 'Content-Type': 'application/json' };
    const bodyObj = JSON.stringify({ action: 'userProfile' })
    const errorIntro = 'error getting user profile data'

    return await spotifyFetch({url, method, headersObj, bodyObj, errorIntro});
    // const { data, error } = await spotifyFetch({url, method, headersObj, bodyObj, errorIntro});

    // if(error){
    //     console.error(error);
    // }

    // // console.log('getUserProfileHandler() - user profile data', data)
    // return {data, error};
}

// gets user data statistics
export const getUserDataHandler = async () => {
    const url = 'http://localhost:3000/user';
    const method = 'POST';
    const headersObj = { 'Content-Type': 'application/json' };
    const bodyObj = JSON.stringify({ action: 'userData' })
    const errorIntro = 'error getting user listening data'

    return await spotifyFetch({ url, method, headersObj, bodyObj, errorIntro });
}

// function will generate auth url where user can authorise app and log them in
export const loginFn = async () => {
    const url = 'http://localhost:3000/login';
    const errorIntro = 'error logging user in';

    const { data, error } = await spotifyFetch({ url, errorIntro });

    if(error) {
        console.error('error logging in');
        return error;
    }

    const { authURL, state } = data
    localStorage.setItem('state', state)

    // go to the auth URL to allow user to authorise app
    window.location.replace(authURL);
}

export const refreshAccessToken = async () => {
    const url = 'http://localhost:3000/refresh-token';
    const errorIntro = 'error refreshing access token';

    const { data:accessToken, error } = await spotifyFetch({ url, errorIntro });
    console.log(accessToken);
    if(!accessToken) {
        return false;
    }

    localStorage.setItem('accessToken', accessToken);
    return true;
}
// function will send fetch request for you with values and data provided
const spotifyFetch = async ({ url, method, bodyObj, headersObj, errorIntro }) => {
    // conditionally configuring the options object depending on if each option was passed in the parameter or not
    const options = {
        ...(method && {method: method}),
        ...(headersObj && { headers: headersObj}),
        ...(bodyObj && {body: bodyObj}),
    }
    // console.log('helper.js - spotifyFetch():', options);

    // general try/catch block that calls fetch(), will be used for all fetch requests in the backend
    try {
        const response = await fetch(url, options);

        if(!response.ok) {
            const errorMsg = await response.text();
            throw new Error(`${errorIntro}, error status: ${response.status}, error message: ${errorMsg}`)
        }

        const data = await response.json();

        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

// gets user profile details
export const getUserProfileHandler = async () => {
    const url = 'http://localhost:3000/user';
    const method = 'POST';
    const headersObj = { 'Content-Type': 'application/json' };
    const bodyObj = JSON.stringify({ action: 'userProfile' })
    const errorIntro = 'error getting user profile data'

    const data = await spotifyFetch({url, method, headersObj, bodyObj, errorIntro})

    console.log('getUserProfileHandler() - user profile data', data)
    return data;
}

// gets user data statistics
export const getUserDataHandler = async () => {
    const url = 'http://localhost:3000/user';
    const method = 'POST';
    const headersObj = { 'Content-Type': 'application/json' };
    const bodyObj = JSON.stringify({ action: 'userData' })
    const errorIntro = 'error getting user listening data'

    const data = await spotifyFetch({ url, method, headersObj, bodyObj, errorIntro });

     console.log('getUserDataHandler()- user listening data: ', data)
    return data;
}

// function will generate auth url where user can authorise app and log them in
export const loginHandlerFn = async () => {
    const url = 'http://localhost:3000/login';
    const errorIntro = 'error logging user in';

    const data = await spotifyFetch({ url, errorIntro });
    console.log('logineHandlerFn() ')

    // go to the auth URL to allow user to authorise app
    window.location.replace(data);
}
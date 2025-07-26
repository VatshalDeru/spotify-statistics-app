import { createContext, useContext, useReducer } from "react";
import { getUserDataHandler, getUserProfileHandler} from "../utils/http";
import { ensureFreshToken } from "../utils/authUtils";
import { NotificationContext } from "./notification-context";

export const UserDataContext = createContext({
    userListeningData: {
        isDataPresent: false,
        topArtists: {},
        topTracks: {},
        recentlyPlayedTracks: [],
    },
    isProfileDataPresent: false,
    userProfileData: {},
    getStartedClickContextFn: () => {},
    getUserProfileContextFn: () => {},
});


const  INTITIAL_USER_DATA_OBJ = {
    userListeningData: {
        isDataPresent: false,
        topArtists: {},
        topTracks: {},
        recentlyPlayedTracks: [],
    },
    isProfileDataPresent: false,
    userProfileData: {},
}

const userDataReducer = (state, action) => {
    switch(action.type){
        case "set-profile-data" : 
            return {
                ...state,
                ...action.payload,
                isProfileDataPresent: true,
            };
        case "set-user-listening-data" :
            return {
                ...state,
                userListeningData: {
                    isDataPresent: true,
                    ...action.payload
                }
            }
        default:
            return state;
    }
}

export default function UserDataContextProvider({ children }) {
    const [userDataState, userDataDispatch] = useReducer(userDataReducer, INTITIAL_USER_DATA_OBJ);
    const { showNotification } = useContext(NotificationContext);

    // invoked when button in heroSection is clicked
    const getStartedClickContextFn = async (logoutModal) => {
        const isTokenFresh = await ensureFreshToken();

        if(!isTokenFresh) {
            logoutModal.current.showModal();
            console.error('session expired, Please logout')
            return;
        }

        showNotification('pending', 'Pending:', 'Fetching Your Data...');
        const { data: userListeningData, error} = await getUserDataHandler();
        
        if(error) {
            showNotification('error', 'Error:', 'An error occured whilst fetching your data!');
            console.error("getUserDataHandler(): Could not fetch user data");
            logoutModal.current.showModal();
            return;
        }

        showNotification('success', 'Success:', 'Fetched your data successfully!');

        userDataDispatch({
            type: 'set-user-listening-data',
            payload : userListeningData
        })
    }

    //invoked in useEffect in App.jsx when user is logged in
    const getUserProfileContextFn = async (logoutModal) => {
        const isTokenFresh = await ensureFreshToken();

        if(!isTokenFresh) {
            logoutModal.current.showModal();
            console.log('session expired, Please logout')
            return;
        };

        // showNotification('pending', 'Pending:', 'Fetching Your Data...');
        const { data: userProfileData, error} = await getUserProfileHandler();
        // console.log(userProfileData)
        if(error) {
            showNotification('error', 'Error:', 'An error occured whilst fetching your data!');
            console.error("getUserDataHandler(): Could not fetch users profile data");
            // shows the logout modal to prompt user to logout
            logoutModal.current.showModal();
            return;
        }

        userDataDispatch({
            type: 'set-profile-data',
            payload: {userProfileData},
        })
    }

    // the object that will be exposed all components accessing this context
    const userDataCtxValue = {
        userListeningData: {
            isDataPresent: userDataState.userListeningData.isDataPresent,
            topArtists: userDataState.userListeningData.topArtists,
            topTracks: userDataState.userListeningData.topTracks,
            recentlyPlayedTracks: userDataState.userListeningData.recentlyPlayedTracks,
        },
        isProfileDataPresent: userDataState.isProfileDataPresent,
        userProfileData: userDataState.userProfileData,
        getStartedClickContextFn,
        getUserProfileContextFn,
    }

    return <UserDataContext value={userDataCtxValue}>
        {children}
    </UserDataContext>
}
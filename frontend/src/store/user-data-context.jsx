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
    getStartedClickHandler: () => {},
    getUserProfileDataHandler: () => {},
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
                    ...state.userListeningData,
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

    // const [userData, setUserData] = useState(INTITIAL_USER_DATA_OBJ);


    const getStartedClickHandler = async (logoutModal) => {
        const isTokenFresh = ensureFreshToken();

        if(!isTokenFresh) {
            console.log('session expired, Please logout')
            return;
        }

        showNotification('pending', 'Pending:', 'Fetching Your Data...');
        const { data: userListeningData, error} = await getUserDataHandler();
        console.log(userListeningData)
        if(error) {
            showNotification('error', 'Error:', 'An error occured whilst fetching your data!');
            console.warn("getUserDataHandler(): Could not fetch user data");
            logoutModal.current.showModal();
            return;
        }

        showNotification('success', 'Success:', 'Fetched your data successfully!');

        userDataDispatch({
            type: 'set-user-listening-data',
            payload : userListeningData
        })
    }

    const getUserProfileDataHandler = async (logoutModal) => {
        const isTokenFresh = ensureFreshToken();

        if(!isTokenFresh) {
            console.log('session expired, Please logout')
            return;
        };

        // showNotification('pending', 'Pending:', 'Fetching Your Data...');
        const { data: userProfileData, error} = await getUserProfileHandler();
        // console.log(userProfileData)
        if(error) {
            showNotification('error', 'Error:', 'An error occured whilst fetching your data!');
            console.warn("getUserDataHandler(): Could not fetch users profile data");
            // shows the logout modal to prompt user to logout
            logoutModal.current.showModal();
            return;
        }

        userDataDispatch({
            type: 'set-profile-data',
            payload: {userProfileData},
        })
    }

    // initilise the userData context value so we can connect to it the state and pass it as a value 
    // to the context provider so the context is available in all nested components
    const userDataCtxValue = {
        userListeningData: {
            isDataPresent: userDataState.userListeningData.isDataPresent,
            topArtists: userDataState.userListeningData.topArtists,
            topTracks: userDataState.userListeningData.topTracks,
            recentlyPlayedTracks: userDataState.userListeningData.recentlyPlayedTracks,
        },
        isProfileDataPresent: userDataState.isProfileDataPresent,
        userProfileData: userDataState.userProfileData,
        getStartedClickHandler,
        getUserProfileDataHandler,
    }

    // console.log(userDataState)
    return <UserDataContext.Provider value={userDataCtxValue}>
        {children}
    </UserDataContext.Provider>
}
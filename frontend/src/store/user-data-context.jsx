import { createContext, useState, useReducer } from "react";
import { getUserDataHandler, getUserProfileHandler} from "../http";
import { ensureFreshToken } from "../util";
import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";

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

    // const [userData, setUserData] = useState(INTITIAL_USER_DATA_OBJ);


    const getStartedClickHandler = async () => {
        const isTokenFresh = ensureFreshToken();

        if(!isTokenFresh) {
            console.log('session expired, Please logout')
            return;
        }

        const userListeningData = await getUserDataHandler();

        if(!userListeningData) {
            console.warn("getUserDataHandler(): the data fetched is undefined");
            return;
        }

        userDataDispatch({
            type: 'set-user-listening-data',
            payload : userListeningData
        })
    }

    const getUserProfileDataHandler = async () => {
        const isTokenFresh = ensureFreshToken();

        if(!isTokenFresh) {
            console.log('session expired, Please logout')
            return;
        };

        const userProfileData = await getUserProfileHandler();

        if(!userProfileData) {
            console.warn("userProfileData(): data fetched was undefined")
        }

        // console.log('got the data here, dispathcing...', userProfileData)
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
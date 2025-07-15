import { createContext, useState, useReducer } from "react";
import { getUserDataHandler, getUserProfileHandler } from "../http";

export const UserDataContext = createContext({
    topArtists: [],
    topTracks: [],
    recentlyPlayedTracks: [],
    userProfileData: {},
    setUserData: () => {},
    getStartedClickHandler: () => {},
    getUserProfileDataHandler: () => {},
});


const  INTITIAL_USER_DATA_OBJ = {
  topArtists: {},
  topTracks: {},
  recentlyPlayedTracks: [],
  userProfileData: {},
}

const userDataReducer = (state, action) => {
    switch(action.type){
        case "set-user-data" : 
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default function UserDataContextProvider({ children }) {
    const [userDataState, userDataDispatch] = useReducer(userDataReducer, INTITIAL_USER_DATA_OBJ);

    // const [userData, setUserData] = useState(INTITIAL_USER_DATA_OBJ);


    const getStartedClickHandler = async () => {
        userDataDispatch({type : "set-user-data"})
        const userListeningData = await getUserDataHandler();

        if(!userListeningData) {
            console.warn("getUserDataHandler(): the data fetched is undefined");
            return;
        }

        userDataDispatch({
            type: 'set-user-data',
            payload : userListeningData
        })
    }

    const getUserProfileDataHandler = async () => {
        const userProfileData = await getUserProfileHandler();

        if(!userProfileData) {
            console.warn("userProfileData(): data fetched was undefined")
        }

        // console.log('got the data here, dispathcing...', userProfileData)
        userDataDispatch({
            type: 'set-user-data',
            payload: {userProfileData},
        })
    }

    // initilise the userData context value so we can connect to it the state and pass it as a value 
    // to the context provider so the context is available in all nested components
    const userDataCtxValue = {
        topArtists: userDataState.topArtists,
        topTracks: userDataState.topTracks,
        recentlyPlayedTracks: userDataState.recentlyPlayedTracks,
        userProfileData: userDataState.userProfileData,
        getStartedClickHandler,
        getUserProfileDataHandler,
    }

    console.log(userDataState)
    return <UserDataContext.Provider value={userDataCtxValue}>
        {children}
    </UserDataContext.Provider>
}
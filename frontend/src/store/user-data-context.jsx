import { createContext, useState } from "react";

export const UserDataContext = createContext({
    topArtists: [],
    topTracks: [],
    recentlyPlayedTracks: [],
    userProfileData: {},
    setUserData: () => {},
});


const  INTITIAL_USER_DATA_OBJ = {
  topArtists: {},
  topTracks: {},
  recentlyPlayedTracks: [],
  userProfileData: {},
}

export default function UserDataContextProvider({ children }) {
    const [userData, setUserData] = useState(INTITIAL_USER_DATA_OBJ);


    // initilise the userData context value so we can connect to it the state and pass it as a value 
    // to the context provider so the context is available in all nested components
    const userDataCtxValue = {
        topArtists: userData.topArtists,
        topTracks: userData.topTracks,
        recentlyPlayedTracks: userData.recentlyPlayedTracks,
        userProfileData: userData.userProfileData,
        setUserData: setUserData,
    }

    return <UserDataContext.Provider value={userDataCtxValue}>
        {children}
    </UserDataContext.Provider>
}
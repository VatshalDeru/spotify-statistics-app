import { createContext } from "react";

export const UserDataContext = createContext({
    topArtits: [],
    topTracks: [],
    listeningHistory: [],
    userProfileData: {},
});
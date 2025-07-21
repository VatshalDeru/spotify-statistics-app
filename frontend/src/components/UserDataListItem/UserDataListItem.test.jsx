import '@testing-library/jest-dom'
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import UserDataListItem from "./UserDataListItem";

const topArtistItemValue = {
    artistsLink: '#',
    image: '#',
    artistName: 'name', 
    artistPopularity: 50,
    followers: 100000
};

const topTrackItemValue = {
    trackLink: '#',
    image: '#',
    trackName: 'name', 
    artists: Array(3).fill({name: ''}),
    trackPopularity: 60,
}
const recentlyPlayedItemValue = {
    trackLink: '#',
    image: '#',
    trackName: 'name', 
    artists: Array(3).fill({name: ''}),
    trackPopularity: 60,
    timeStamp: 'date'
}

describe('UserDataListItem component', () => {
    it("it should render an artist item when itemType is 'topArtist' (this is also default)", () => {
        render(<UserDataListItem item={topArtistItemValue} itemType={'topArtists'} rank={1}/>)
        const artistItem = screen.getByTestId('topArtists');
        
        expect(artistItem).toBeInTheDocument();    
    });
    it("it should render a track item when itemType is 'topTrack'", () => {
        render(<UserDataListItem item={topTrackItemValue} itemType={'topTracks'} rank={1}/>)

        const trackItem = screen.getByTestId('topTracks');
        
        expect(trackItem).toBeInTheDocument();    
    });
    it("it should render a track item when itemType is 'recentlyPlayedTracks'", () => {
        render(<UserDataListItem item={recentlyPlayedItemValue} itemType={'recentlyPlayedTracks'} rank={1}/>)

        const recentlyPlayedItem = screen.getByTestId('recentlyPlayedTracks');
        
        expect(recentlyPlayedItem).toBeInTheDocument();    
    });
    it("it should not render anything itemType is not one of the above, regardless of the item passed", () => {
        render(<UserDataListItem item={topArtistItemValue} itemType={''} rank={1}/>)

        const artistItem = screen.queryByTestId('topArtists');
        const trackItem = screen.queryByTestId('topTracks');
        const recentlyPlayedItem = screen.queryByTestId('recentlyPlayedTracks');

        expect(artistItem).not.toBeInTheDocument();
        expect(trackItem).not.toBeInTheDocument();
        expect(recentlyPlayedItem).not.toBeInTheDocument();
    });
    it("it should not render anything if the itemType is topTracks but the item is an empty object", () => {
        render(<UserDataListItem item={{}} itemType={'topTracks'} rank={1}/>);

        const artistItem = screen.queryByTestId('topArtists');
        const trackItem = screen.queryByTestId('topTracks');
        const recentlyPlayedItem = screen.queryByTestId('recentlyPlayedTracks');

        expect(artistItem).not.toBeInTheDocument();
        expect(trackItem).not.toBeInTheDocument();
        expect(recentlyPlayedItem).not.toBeInTheDocument();
    });
    it("it should not render anything if the itemType is topArtist but the item is an empty object", () => {
        render(<UserDataListItem item={{}} itemType={'topArtists'} rank={1}/>);

        const artistItem = screen.queryByTestId('topArtists');
        const trackItem = screen.queryByTestId('topTracks');
        const recentlyPlayedItem = screen.queryByTestId('recentlyPlayedTracks');

        expect(artistItem).not.toBeInTheDocument();
        expect(trackItem).not.toBeInTheDocument();
        expect(recentlyPlayedItem).not.toBeInTheDocument();
    });
    it("it should not render anything if the itemType is recentlyPlayed but the item is an empty object", () => {
        render(<UserDataListItem item={{}} itemType={'recentlyPlayedTracks'} rank={1}/>);

        const artistItem = screen.queryByTestId('topArtists');
        const trackItem = screen.queryByTestId('topTracks');
        const recentlyPlayedItem = screen.queryByTestId('recentlyPlayedTracks');

        expect(artistItem).not.toBeInTheDocument();
        expect(trackItem).not.toBeInTheDocument();
        expect(recentlyPlayedItem).not.toBeInTheDocument();
    });
});
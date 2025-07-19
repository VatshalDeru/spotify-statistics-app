import '@testing-library/jest-dom'
import { expect, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ControlPanel from "./ControlPanel";
import { UserDataContext } from "../../store/user-data-context";
// import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';
import userEvent from '@testing-library/user-event'

const mockUserDataContextValue = {
    userListeningData: {
        isDataPresent: false,
        topArtists: {
            short_term: [],
            medium_term: [],
            long_term: [],
        },
        topTracks: {
            short_term: [],
            medium_term: [],
            long_term: [],
        },  
        recentlyPlayedTracks: [],
    },
    isProfileDataPresent: false,
    userProfileData: {},
}

const renderWithContext = (ui, contextValue) => {
    return render(<UserDataContext value={contextValue}>
        {ui}
    </UserDataContext>)
}

describe('ControlPanel component', () => {
    it('should render all dataType buttons', () => {
        const selectedConfig = {
            dataType: 'topArtists',
            timeRange: 'short_term'
        }

        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockUserDataContextValue)

        const buttonsElementArr = [
            screen.getByRole('button', { name: 'Top Artists' }),
            screen.getByRole('button', { name: 'Top Tracks' }),
            screen.getByRole('button', { name: 'Recently Played' }),
            screen.getByRole('button', { name: '4 Weeks' }),
            screen.getByRole('button', { name: '6 Months' }),
            screen.getByRole('button', { name: '12 Months' }),
        ]

        buttonsElementArr.forEach(button => {
            expect(button).toBeInTheDocument();
        })
    });

    // testing all dataTypes button below
    it("should highlight only the 'Top Artist' button if selectedConfig.dataType is 'topArtists'", async () => {
        const selectedConfig = {
            dataType: 'topArtists',
            timeRange: 'short_term'
        }
        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockUserDataContextValue)

        const topArtistsBtn = screen.getByRole('button', { name: 'Top Artists' });
        const topTracksBtn = screen.getByRole('button', { name: 'Top Tracks' });
        const recentlyPlayedBtn = screen.getByRole('button', { name: 'Recently Played' });

        expect(topArtistsBtn).toHaveClass('selected');
        expect(topTracksBtn).not.toHaveClass('selected');
        expect(recentlyPlayedBtn).not.toHaveClass('selected');
    });

    it("should highlight only the 'Top Tracks' button if selectedConfig.dataType is 'topTracks'", async () => {
        const selectedConfig = {
            dataType: 'topTracks',
            timeRange: 'short_term'
        }
        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockUserDataContextValue)

        const topArtistsBtn = screen.getByRole('button', { name: 'Top Artists' });
        const topTracksBtn = screen.getByRole('button', { name: 'Top Tracks' });
        const recentlyPlayedBtn = screen.getByRole('button', { name: 'Recently Played' });

        expect(topArtistsBtn).not.toHaveClass('selected');
        expect(topTracksBtn).toHaveClass('selected');
        expect(recentlyPlayedBtn).not.toHaveClass('selected');
    });

    it("should highlight only the 'Recently Played' button if selectedConfig.dataType is 'recentlyPlayedTracks'", async () => {
        const selectedConfig = {
            dataType: 'recentlyPlayedTracks',
            timeRange: 'short_term'
        }
        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockUserDataContextValue)

        const topArtistsBtn = screen.getByRole('button', { name: 'Top Artists' });
        const topTracksBtn = screen.getByRole('button', { name: 'Top Tracks' });
        const recentlyPlayedBtn = screen.getByRole('button', { name: 'Recently Played' });

        expect(topArtistsBtn).not.toHaveClass('selected');
        expect(topTracksBtn).not.toHaveClass('selected');
        expect(recentlyPlayedBtn).toHaveClass('selected');
    });

    // testing all timeRange button below
    it("should only highlight only '4 Weeks' button if selectedConfig.data is 'short_term'", () => {
        const selectedConfig = {
            dataType: 'topArtists',
            timeRange: 'short_term'
        };

        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockUserDataContextValue);

        const shortTermBtn = screen.getByRole('button', { name: '4 Weeks' });
        const mediumTermBtn  = screen.getByRole('button', { name: '6 Months' });
        const longTermBtn  = screen.getByRole('button', { name: '12 Months' });

        expect(shortTermBtn).toHaveClass('selected');
        expect(mediumTermBtn).not.toHaveClass('selected');
        expect(longTermBtn).not.toHaveClass('selected');
    });

    it("should only highlight only '4 Weeks' button if selectedConfig.data is 'short_term'", () => {
        const selectedConfig = {
            dataType: 'topArtists',
            timeRange: 'medium_term'
        };

        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockUserDataContextValue);

        const shortTermBtn = screen.getByRole('button', { name: '4 Weeks' });
        const mediumTermBtn  = screen.getByRole('button', { name: '6 Months' });
        const longTermBtn  = screen.getByRole('button', { name: '12 Months' });

        expect(shortTermBtn).not.toHaveClass('selected');
        expect(mediumTermBtn).toHaveClass('selected');
        expect(longTermBtn).not.toHaveClass('selected');
    });

    it("should only highlight only '4 Weeks' button if selectedConfig.data is 'short_term'", () => {
        const selectedConfig = {
            dataType: 'topArtists',
            timeRange: 'long_term'
        };

        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockUserDataContextValue);

        const shortTermBtn = screen.getByRole('button', { name: '4 Weeks' });
        const mediumTermBtn  = screen.getByRole('button', { name: '6 Months' });
        const longTermBtn  = screen.getByRole('button', { name: '12 Months' });

        expect(shortTermBtn).not.toHaveClass('selected');
        expect(mediumTermBtn).not.toHaveClass('selected');
        expect(longTermBtn).toHaveClass('selected');
    });

    // testing if config buttons change the selectedConfig State with appropriate values when click
    it("should call setSelectedConfig with the correct data type value passed to it when pressed by a 'dataType' button", async() =>{
        const mockSetSelectedConfig = vi.fn();
        const mockSelectedConfig = {
            dataType: 'topArtists',
            timeRange: 'short_term',
        };

        renderWithContext(<ControlPanel setSelectedConfig={mockSetSelectedConfig} selectedConfig={mockSelectedConfig}/>, mockUserDataContextValue);

        const topTracksBtn = screen.getByRole('button', { name: 'Top Tracks' });
        const recentlyPlayedBtn = screen.getByRole('button', { name: 'Recently Played' });
        const topArtistsBtn = screen.getByRole('button', { name: 'Top Artists' });

        await userEvent.click(topTracksBtn);
        await userEvent.click(recentlyPlayedBtn);
        await userEvent.click(topArtistsBtn);
        expect(mockSetSelectedConfig).toHaveBeenCalledTimes(3);


        // get state updating function passed to mockSetSelectedConfig
        const stateUpdaterFnArr = mockSetSelectedConfig.mock.calls;

        // check if dataType state was updated with 'topTracks' when 'Top Artists' button was pressed 
        const updatedTracksState = stateUpdaterFnArr[0][0](mockSelectedConfig);
        expect(updatedTracksState).toEqual({
            ...mockSelectedConfig,
            dataType: 'topTracks',
        })

        // check if dataType state was updated with'recentlyPlayedTracks' when 'Top Tracks' button was pressed 
        const updatedRecentlyPLayedState = stateUpdaterFnArr[1][0](mockSelectedConfig);
        expect(updatedRecentlyPLayedState).toEqual({
            ...mockSelectedConfig,
            dataType: 'recentlyPlayedTracks',
        })

        // check if dataType state was updated with 'topArtists' when 'Recently Played' button was pressed 
        // pass different dataType to see if it actually changes
        const updatedArtistState = stateUpdaterFnArr[2][0]({
            dataType: 'topTracks',
            timeRange: 'short_term',
        });
        expect(updatedArtistState).toEqual({
            ...mockSelectedConfig,
            dataType: 'topArtists',
        })
    });

    it("should call setSelectedConfig with the correct data type value passed to it when pressed by a 'dataType button'", async() =>{
        const mockSetSelectedConfig = vi.fn();
        const mockSelectedConfig = {
            dataType: 'topArtists',
            timeRange: 'short_term',
        };

        renderWithContext(<ControlPanel setSelectedConfig={mockSetSelectedConfig} selectedConfig={mockSelectedConfig}/>, mockUserDataContextValue);
        
        const mediumTermBtn = screen.getByRole('button', { name: '6 Months' });
        const longTermBtn = screen.getByRole('button', { name: '12 Months' });
        const shortTermBtn = screen.getByRole('button', { name: '4 Weeks' });

        await userEvent.click(mediumTermBtn);
        await userEvent.click(longTermBtn);
        await userEvent.click(shortTermBtn);

        expect(mockSetSelectedConfig).toHaveBeenCalledTimes(3);

        // get state updating function passed to mockSetSelectedConfig
        const stateUpdaterFnArr = mockSetSelectedConfig.mock.calls;

        // check if dataType state was updated with 'medium_term' when '6 Months' button was pressed 
        const updatedMediumTermState = stateUpdaterFnArr[0][0](mockSelectedConfig);
        expect(updatedMediumTermState).toEqual({
            ...mockSelectedConfig,
            timeRange: 'medium_term',
        })

        // check if dataType state was updated with 'long_term' when '12 Months' button was pressed 
        const updatedLongTermState = stateUpdaterFnArr[1][0](mockSelectedConfig);
        expect(updatedLongTermState).toEqual({
            ...mockSelectedConfig,
            timeRange: 'long_term',
        })

        // check if dataType state was updated with 'short_term' when '4 Weeks' button was pressed 
        // pass different dataType to see if it actually changes
        const updatedShortTermState = stateUpdaterFnArr[2][0]({
            dataType: 'topArtists',
            timeRange: 'long_term',
        });
        expect(updatedShortTermState).toEqual({
            ...mockSelectedConfig,
            timeRange: 'short_term',
        })
    });
})
import '@testing-library/jest-dom'
import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ControlPanel from "./ControlPanel";
import { UserDataContext } from "../../store/user-data-context";
// import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';
import userEvent from '@testing-library/user-event'

const mockContextValue = {
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

        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockContextValue)

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
    })

    // testing all dataTypes button below
    it("should highlight only the 'Top Artist' button if selectedConfig.dataType is 'topArtists'", async () => {
        const selectedConfig = {
            dataType: 'topArtists',
            timeRange: 'short_term'
        }
        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockContextValue)

        const topArtistsBtn = screen.getByRole('button', { name: 'Top Artists' });
        const topTracksBtn = screen.getByRole('button', { name: 'Top Tracks' });
        const recentlyPlayedBtn = screen.getByRole('button', { name: 'Recently Played' });

        expect(topArtistsBtn).toHaveClass('selected');
        expect(topTracksBtn).not.toHaveClass('selected');
        expect(recentlyPlayedBtn).not.toHaveClass('selected');
    })

    it("should highlight only the 'Top Tracks' button if selectedConfig.dataType is 'topTracks'", async () => {
        const selectedConfig = {
            dataType: 'topTracks',
            timeRange: 'short_term'
        }
        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockContextValue)

        const topArtistsBtn = screen.getByRole('button', { name: 'Top Artists' });
        const topTracksBtn = screen.getByRole('button', { name: 'Top Tracks' });
        const recentlyPlayedBtn = screen.getByRole('button', { name: 'Recently Played' });

        expect(topArtistsBtn).not.toHaveClass('selected');
        expect(topTracksBtn).toHaveClass('selected');
        expect(recentlyPlayedBtn).not.toHaveClass('selected');
    })

    it("should highlight only the 'Recently Played' button if selectedConfig.dataType is 'recentlyPlayedTracks'", async () => {
        const selectedConfig = {
            dataType: 'recentlyPlayedTracks',
            timeRange: 'short_term'
        }
        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockContextValue)

        const topArtistsBtn = screen.getByRole('button', { name: 'Top Artists' });
        const topTracksBtn = screen.getByRole('button', { name: 'Top Tracks' });
        const recentlyPlayedBtn = screen.getByRole('button', { name: 'Recently Played' });

        expect(topArtistsBtn).not.toHaveClass('selected');
        expect(topTracksBtn).not.toHaveClass('selected');
        expect(recentlyPlayedBtn).toHaveClass('selected');
    })

    // testing all timeRange button below
    it("should only highligh only '4 Weeks' button if selectedConfig.data is 'short_term'", () => {
        const selectedConfig = {
            dataType: 'topArtists',
            timeRange: 'short_term'
        };

        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockContextValue);
        screen.debug();

        const shortTermBtn = screen.getByRole('button', { name: '4 Weeks' });
        const mediumTermBtn  = screen.getByRole('button', { name: '6 Months' });
        const longTermBtn  = screen.getByRole('button', { name: '12 Months' });

        expect(shortTermBtn).toHaveClass('selected');
        expect(mediumTermBtn).not.toHaveClass('selected');
        expect(longTermBtn).not.toHaveClass('selected');
    })

    it("should only highligh only '4 Weeks' button if selectedConfig.data is 'short_term'", () => {
        const selectedConfig = {
            dataType: 'topArtists',
            timeRange: 'medium_term'
        };

        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockContextValue);
        screen.debug();

        const shortTermBtn = screen.getByRole('button', { name: '4 Weeks' });
        const mediumTermBtn  = screen.getByRole('button', { name: '6 Months' });
        const longTermBtn  = screen.getByRole('button', { name: '12 Months' });

        expect(shortTermBtn).not.toHaveClass('selected');
        expect(mediumTermBtn).toHaveClass('selected');
        expect(longTermBtn).not.toHaveClass('selected');
    })

    it("should only highligh only '4 Weeks' button if selectedConfig.data is 'short_term'", () => {
        const selectedConfig = {
            dataType: 'topArtists',
            timeRange: 'long_term'
        };

        renderWithContext(<ControlPanel selectedConfig={selectedConfig}/>, mockContextValue);
        screen.debug();

        const shortTermBtn = screen.getByRole('button', { name: '4 Weeks' });
        const mediumTermBtn  = screen.getByRole('button', { name: '6 Months' });
        const longTermBtn  = screen.getByRole('button', { name: '12 Months' });

        expect(shortTermBtn).not.toHaveClass('selected');
        expect(mediumTermBtn).not.toHaveClass('selected');
        expect(longTermBtn).toHaveClass('selected');
    })
})
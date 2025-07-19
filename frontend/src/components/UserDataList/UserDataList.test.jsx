import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserDataList from './UserDataList';
import { UserDataContext } from '../../store/user-data-context';

vi.mock("../UserDataListItem/UserDataListItem", () => ({
    default: () => <li>Artist Details</li>
}))

const mockUserDataContextValue = {
    userListeningData: {
        isDataPresent: false,
        topArtists: {
            short_term: Array(20).fill({}),
            medium_term: Array(20).fill({}),
            long_term: Array(20).fill({}),
        },
        topTracks: {
            short_term: Array(20).fill({}),
            medium_term: Array(20).fill({}),
            long_term: Array(20).fill({}),
        },  
        recentlyPlayedTracks: [],
    }
}

const renderWithContext = (ui, userDataContextValue) => {
    return render(<UserDataContext value={userDataContextValue}>
        {ui}
    </UserDataContext>);
};

describe('UserDataList component', () => {
    it("renders the heading with text content 'Top Artists in the last 4 weeks' by default", () => {
        const selectedConfig = {
            dataType: 'topArtists',
            timeRange: 'short_term'
        }
        renderWithContext(<UserDataList selectedConfig={selectedConfig}/>, mockUserDataContextValue)
        // screen.debug()
        const heading = screen.getByRole('heading', { level: 2, name: 'Top Artists in the last 4 weeks' });

        expect(heading).toBeInTheDocument();
    })
    it('should render the same amount of UserDataListItems as the amount of objects in the selected dataTypes timeRange array', () => {
        const selectedConfig = {
            dataType: 'topArtists',
            timeRange: 'short_term'
        }
        renderWithContext(<UserDataList selectedConfig={selectedConfig}/>, mockUserDataContextValue);
        screen.debug();

        const listItem = screen.getAllByText('Artist Details');

        expect(listItem).toHaveLength(mockUserDataContextValue.userListeningData[selectedConfig.dataType][selectedConfig.timeRange].length)
    })
    it('Should render error heading if selectedConfig is not provided', () => {
        renderWithContext(<UserDataList/>, mockUserDataContextValue);
        // screen.debug()
        const errorHeading = screen.getByRole('heading', { level: 2, name: 'Error showing your data :(' })

        expect(errorHeading).toBeInTheDocument();
    })
    it("should render error heading if the userListeningData value for a given dataType is undefined", () => {
        const selectedConfig = {
            dataType: 'topArtists',
            timeRange: 'short_term',
        }
        renderWithContext(<UserDataList selectedConfig={selectedConfig}/>, { userListeningData: {
            topTracks: {}
        }});

        const errorHeading = screen.getByRole('heading', { level: 2, name: 'Error showing your data :('});

        expect(errorHeading).toBeInTheDocument();
    })
})
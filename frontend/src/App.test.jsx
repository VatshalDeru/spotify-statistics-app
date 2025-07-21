import '@testing-library/jest-dom'
import { describe, expect, it, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import App from "./App";
import { UserDataContext } from "./store/user-data-context";
import { NotificationContext } from "./store/notification-context";
import * as authUtils from './utils/authUtils'

vi.mock('./utils/authUtils.js');
vi.mock('./utils/authUtils.js');


const mockgetUserProfileContextFn =  vi.fn();
const mockShowNotification = vi.fn();

const mockCompleteUserDataContextValue = {
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
        recentlyPlayedTracks: Array(20).fill({}),
    },
    getUserProfileContextFn: mockgetUserProfileContextFn,
    userProfileData: {
    isProfileDataPresent: true,
    userProfileData: {
        external_urls: {
            spotify: '#'
        },
        images: [{ url: '#' }, { url: '#' }, { url: '#' }],
        display_name: 'userName',
        id: 'id',
        followers: {
            total: 1
        },
    }
},
}

const mockIncompletUserDataContextValue = {
    getUserProfileContextFn: mockgetUserProfileContextFn,
    userListeningData: {},
};

const renderWithContext = ( userDataContextValue) => {
    return render(
        <NotificationContext value={{showNotification: mockShowNotification}}>
            <UserDataContext value={userDataContextValue}>
                <App/>
            </UserDataContext>
        </NotificationContext>
    )
}

describe('App component', () => {
    it("Should render just login button in navbar and 'Get Started' button from HeroSection when no user is logged in", () =>{
        authUtils.checkURLforParams.mockReturnValue({ status: 'neutral' });
        authUtils.checkIsLoggedIn.mockReturnValue(false);
        renderWithContext(mockIncompletUserDataContextValue);

        // screen.debug();

        const loginBtn = screen.getByRole('button', { name: 'Login' });
        const spotifyElement = screen.getByText('Spotify');
        const wrappedElement = screen.getByText('Wrapped');
        
        expect(loginBtn).toBeInTheDocument();
        expect(spotifyElement).toBeInTheDocument();
        expect(wrappedElement).toBeInTheDocument();
    });
    it('should call showNotification if user logged in succesfully', () => {
        authUtils.checkURLforParams.mockReturnValue({ status: 'success' });
        renderWithContext(mockIncompletUserDataContextValue);
        
        expect(mockShowNotification).toHaveBeenCalledWith('success', 'Success:', 'Logged In!');
    });
    it('should call showNotification if user faces error logging in', () => {
        authUtils.checkURLforParams.mockReturnValue({ status: 'error' });
        renderWithContext(mockIncompletUserDataContextValue);
        
        expect(mockShowNotification).toHaveBeenCalledWith('error', 'Error:', 'error logging in!');
    });
    it("Should call getUserProfileContextFn if user is logged in", async () => {
        authUtils.checkURLforParams.mockReturnValue({ status: 'neutral' })
        authUtils.checkIsLoggedIn.mockReturnValue(true);
        authUtils.ensureFreshToken.mockResolvedValue(true);

        renderWithContext(mockIncompletUserDataContextValue);

        await waitFor(() => {
            expect(mockgetUserProfileContextFn).toHaveBeenCalled();
        })
    });
    it("should render UserDataContainer when  user is logged in and userListeningData is completer", () => {
        authUtils.checkURLforParams.mockReturnValue({ status: 'neutral' })
        authUtils.checkIsLoggedIn.mockReturnValue(true);
        authUtils.ensureFreshToken.mockResolvedValue(true);

        renderWithContext(mockCompleteUserDataContextValue);
        screen.debug();

        const userDataContainerElement = screen.getByTestId('user-data-container')

        expect(userDataContainerElement).toBeInTheDocument();
    });
    it("should call clearStorage if ensureFreshToken Fails", async () => {
        authUtils.checkURLforParams.mockReturnValue({ status: 'neutral' });
        authUtils.checkIsLoggedIn.mockReturnValue(true);
        authUtils.ensureFreshToken.mockResolvedValue(false);

        renderWithContext(mockIncompletUserDataContextValue)

        await waitFor(() => {
            expect(authUtils.clearStorage).toHaveBeenCalled();
        })
    })
})
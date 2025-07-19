import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';
import { expect, describe, it, vi } from 'vitest';
import { UserDataContext } from '../../store/user-data-context';
import { NotificationContext } from '../../store/notification-context';

vi.mock('../../utils/http.js', () => ({
    loginFn: vi.fn(),
}))

import { loginFn } from '../../utils/http';

const mockGetStartedClickHandler = vi.fn();
const mockGetUserProfileDataHandler = vi.fn();

const mockFetchedProfileContextValue = {
    isProfileDataPresent: true,
    userProfileData: { 
        external_urls: {
            spotify: '#'
        },
        images: [{ url: '#' }],
        display_name: 'userName',
        id: 'id',
        followers: {
            total: 1
        },
    },
    getStartedClickHandler: mockGetStartedClickHandler,
    getUserProfileDataHandler: mockGetUserProfileDataHandler,
};

// simulates context value when no user profile data is present
const mockProfileContextValue = {
    isProfileDataPresent: false,
    userProfileData: { },
    getStartedClickHandler: mockGetStartedClickHandler,
    getUserProfileDataHandler: mockGetUserProfileDataHandler,
};

const mockShowNotification = vi.fn();

const mockNoitificationContextValue = {
    requestState: null,
    title: '',
    message: '',
    showNotification: mockShowNotification,
}

function renderWithContext( ui, notifcationContextValue, userDataContextValue) {
    return render(
        <NotificationContext value={notifcationContextValue}>
            <UserDataContext value={userDataContextValue}>
                {ui}
            </UserDataContext>
        </NotificationContext>
    )
}

describe('Navbar Component', () => { 
    it("Should render the login button if the user is not logged in", () => {
        render(<Navbar isLoggedIn={false}/>);

        const buttonElement = screen.getByRole('button', { name: "Login" });
        expect(buttonElement).toBeInTheDocument();
    });
    it("Should not render the login button if the user is logged in", async () => {
        render(<Navbar isLoggedIn={true}/>);

        const buttonElement = screen.queryByRole('button', { name: "Login" },);
        expect(buttonElement).toBe(null);
    });
    it('Should not render the users profile image in the corner if the user is not logged in and the userProfileData is not present', async () => {
        renderWithContext(<Navbar isLoggedIn={false}/>, mockNoitificationContextValue, mockProfileContextValue);

        const profileDiv = screen.queryByAltText('Profile Picture');
        expect(profileDiv).toBe(null);
    });
    it("Should not render the users profile image in the corner if the user is not logged in but the userProfileData is present", () => {
        renderWithContext(<Navbar isLoggedIn={false}/>, mockNoitificationContextValue, mockFetchedProfileContextValue);

        const profileDiv = screen.queryByAltText('Profile Picture');
        expect(profileDiv).toBe(null);
    });
    it('Should not render the users profile image in the corner if the user is logged in but the userProfileData is an empty object', async () => {
        renderWithContext(<Navbar isLoggedIn={true}/>, mockNoitificationContextValue, mockProfileContextValue);
        
        const profileDiv = screen.queryByAltText('Profile Picture');
        expect(profileDiv).toBe(null);
    });
    it('Should render the users profile image if the user is logged in and the userProfileData is present', async () => {
        renderWithContext(<Navbar isLoggedIn={true}/>, mockNoitificationContextValue, mockFetchedProfileContextValue);

        const profileDiv = screen.getByAltText('Profile Picture');
        
        expect(profileDiv).toBeInTheDocument()
    });
    it('Should not render the ProfilePopUpCard component by default', () => {
        renderWithContext(<Navbar isLoggedIn={true}/>, mockNoitificationContextValue, mockFetchedProfileContextValue);

        const profileCardElements = [
            screen.queryByRole('link', { name: 'user spotify profile picture' }),
            screen.queryByAltText('user spotify profile picture'),
            screen.queryByRole('heading', { level: 2 }),
            screen.queryByTestId('userId'),
            screen.queryByTestId('userFollower'),
        ];


        profileCardElements.forEach(element => {
            expect(element).toBeNull();
        });
    });
    it('Should render the ProfilePopUpCard Component if the user clicks their profile pic', async ()=> {
        const user = userEvent.setup();
        renderWithContext(<Navbar isLoggedIn={true}/>, mockNoitificationContextValue, mockFetchedProfileContextValue)

        const profileButton = screen.getByTestId('profile-button');
        await user.click(profileButton);

        const profileCardElements = [
            screen.getByRole('link', { name: 'user spotify profile picture' }),
            screen.getByAltText('user spotify profile picture'),
            screen.getByRole('heading', { level: 2 }),
            screen.getByTestId('userId'),
            screen.getByTestId('userFollower'),
        ];

        profileCardElements.forEach(element => {
            expect(element).toBeInTheDocument();
        });
    });
    it('Should call showNotification and loginFn when the user clicks on login button and login is successfull', async () => {
        renderWithContext(<Navbar isLoggedIn={false}/>, mockNoitificationContextValue, mockProfileContextValue);

        const loginButton = screen.getByRole('button', { name: 'Login' });
        
        await userEvent.click(loginButton);

        expect(mockShowNotification).toHaveBeenCalledWith('pending', 'Pending:', 'Logging in...');
        expect(loginFn).toHaveBeenCalled();
    })
    it('should call showNotification with error status if the login is unsuccessful', async () => {
        vi.mocked(loginFn).mockResolvedValueOnce(false);

       renderWithContext(<Navbar isLoggedIn={false}/>, mockNoitificationContextValue, mockProfileContextValue);

       const loginBtn = screen.getByRole('button', { name: 'Login' });

       await userEvent.click(loginBtn);

       expect(mockShowNotification).toHaveBeenCalledWith('error', 'Error:', 'Error logging you in!');
    })
})
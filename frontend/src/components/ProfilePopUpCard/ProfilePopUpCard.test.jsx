
import { describe, it, expect, vi } from "vitest";


import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { UserDataContext } from '../../store/user-data-context';
import ProfilePopUpCard from './ProfilePopUpCard';
import { NotificationContext } from '../../store/notification-context';
import userEvent from '@testing-library/user-event'


vi.mock("../../utils/authUtils.js", () => ({
    clearStorage: vi.fn(),
}));

import { clearStorage } from "../../utils/authUtils";
import { useState } from "react";

const mockUserDataContextValue = {
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
}


const mockShowNotification = vi.fn()
const mockNotificationContextValues = {
    showNotification: mockShowNotification
}


const renderWithContext = (ui, notificationContextValue, userDataContextValue) => {
    // const mockShowNotification = vi.fn()
    return render(<NotificationContext value={notificationContextValue}>
        <UserDataContext value={userDataContextValue}>
            {ui}
        </UserDataContext>
    </NotificationContext>
    )
};

describe('ProfilePopUpCard component', () => {
    it('renders correctly', () => {
        renderWithContext(<ProfilePopUpCard open={true}/>, mockNotificationContextValues, mockUserDataContextValue)
        
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
    })
    
    it('does not render if open prop is false', () => {
        renderWithContext(<ProfilePopUpCard open={false}/>, mockNotificationContextValues, mockUserDataContextValue);
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
    })
    
    it("does not render if isProfileDataPresent is false", () => {
        renderWithContext(<ProfilePopUpCard open={true}/>, mockNotificationContextValues, { isProfileDataPresent: false })
        
        const logoutButton = screen.queryByRole('button', { name: 'Logout' });

        expect(logoutButton).not.toBeInTheDocument();
    })

    it("does not render if the userProfileData object in context is empty", () => {
        renderWithContext(<ProfilePopUpCard open={true}/>, mockNotificationContextValues,{ 
            isProfileDataPresent: true, 
            userProfileData: {},
        });

        const logoutButton = screen.queryByRole('button', { name: 'Logout' })

        expect(logoutButton).not.toBeInTheDocument();
    })

    it("doesn't render if the userProfileData is an empty object (open is true)", () => {
        renderWithContext(<ProfilePopUpCard open={true}/>, mockNotificationContextValues, { userProfileData: {} });

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
    })

    it("calls functions inside of the clickLogoutBtnHandler when you press logout button", async () => {

        const mockSetIsLoggedIn = vi.fn();
        renderWithContext(<ProfilePopUpCard open={true} setIsLoggedIn={mockSetIsLoggedIn}/>, mockNotificationContextValues, mockUserDataContextValue)

        const logoutBtn = screen.getByRole('button', { name: 'Logout' });

        await userEvent.click(logoutBtn);

        // console.log(clearStorage)
        expect(clearStorage).toBeCalled();
        expect(mockSetIsLoggedIn).toBeCalledWith(false);
        expect(mockShowNotification).toBeCalledWith('success', 'Success:', 'you have been logged out')
    })

    it("calls the closeCard function if the user clicks outside the component", async () => {
        const mockCloseCard = vi.fn();
        renderWithContext(<>
            <button>outside element</button>
            <ProfilePopUpCard open={true} closeCard={mockCloseCard}/>
        </>, mockNotificationContextValues, mockUserDataContextValue)
        
        const outsideElement = screen.getByRole('button', { name: 'outside element' })
        await userEvent.click(outsideElement);
        
        expect(mockCloseCard).toHaveBeenCalled();
    })
    
    it('removes ProfilePopUpCard from DOM after logout button is cliked', async() => {
        function TestWrapper() {
            // the setter is called by logout button
            const [isLoggedIn, setIsLoggedIn] = useState(true);

            if(!isLoggedIn ) return null;
            return  <ProfilePopUpCard open={true} setIsLoggedIn={setIsLoggedIn} />
        };

        renderWithContext(<TestWrapper/>, mockNotificationContextValues, mockUserDataContextValue);

        const logoutButton = screen.getByRole('button', { name: 'Logout' });

        // check if it is rendered initially before click
        expect(logoutButton).toBeInTheDocument();

        await userEvent.click(logoutButton);

        // check its not there after click
        expect(screen.queryByRole('button', { name: 'Logout' })).not.toBeInTheDocument();
    })    
})
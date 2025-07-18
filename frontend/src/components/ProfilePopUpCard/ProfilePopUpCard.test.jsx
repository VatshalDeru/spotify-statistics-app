import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { UserDataContext } from '../../store/user-data-context';
import ProfilePopUpCard from './ProfilePopUpCard';

const mockContextValue = {
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
    }
}

const renderWithContext = (ui, contextValue) => {
    return render(<UserDataContext value={contextValue}>
        {ui}
    </UserDataContext>)
};

describe('ProfilePopUpCard component', () => {
    it('renders correctly', () => {
        renderWithContext(<ProfilePopUpCard open={true}/>, mockContextValue)
        screen.debug()

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
        renderWithContext(<ProfilePopUpCard open={false}/>, mockContextValue);
        screen.debug();

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
    
    it("doesn't render if the userProfileData is an empty object (open is true)", () => {
        renderWithContext(<ProfilePopUpCard open={true}/>, { userProfileData: {} });
        screen.debug();

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
})
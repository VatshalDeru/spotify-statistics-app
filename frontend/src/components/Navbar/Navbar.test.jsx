import '@testing-library/jest-dom'
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';
import { expect, describe, it, vi } from 'vitest';
import { UserDataContext } from '../../store/user-data-context';

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
    },
    getStartedClickHandler: vi.fn(),
    getUserProfileDataHandler: vi.fn(),
};

function renderWithContext( ui, contextValue) {
    return render(
        <UserDataContext value={ contextValue }>
           {ui}
        </UserDataContext>
    )
}


// Mock user images data


describe('Navbar Component', () => { 
    it("Should render the login button if the user is not logged in", () => {
        render(<Navbar isLoggedIn={false}/>);

        const buttonElement = screen.getByRole('button', { name: "Login" });
        expect(buttonElement).toBeInTheDocument();
    })

    it("Should not render the login button if the user is logged in", async () => {
        render(<Navbar isLoggedIn={true}/>);

        const buttonElement = screen.queryByRole('button', { name: "Login" },);
        expect(buttonElement).toBe(null);
    })

    it('Should not render the users profile image in the corner if the user is not logged in and the userProfileData is not present', async () => {
        renderWithContext(<Navbar isLoggedIn={false}/>, { userProfileData: {}, isProfileDataPresent: false});

        const profileDiv = screen.queryByAltText('Profile Picture');
        expect(profileDiv).toBe(null);
    })

    it("Should not render the users profile image in the corner if the user is not logged in but the userProfileData is present", () => {
        renderWithContext(<Navbar isLoggedIn={false}/>, mockContextValue);

        const profileDiv = screen.queryByAltText('Profile Picture');
        expect(profileDiv).toBe(null);
    })
    
    it('Should not render the users profile image in the corner if the user is logged in but the userProfileData is an empty object', async () => {
        // pass with object userProfileData property set to empty object
        // *PERSONAL NOTE* DONT pass empty object here, userProfileData will be undefined in Navbar component, and if you're accesing values from userPorfileData in there, it will thorw a type error
        renderWithContext(<Navbar isLoggedIn={true}/>, { userProfileData: {}, isProfileDataPresent: false});
        
        const profileDiv = screen.queryByAltText('Profile Picture');
        expect(profileDiv).toBe(null);
    })

    it('Should render the users profile image in the corner if the user is logged in and the userProfileData is present', async () => {
        renderWithContext(<Navbar isLoggedIn={true}/>, mockContextValue);

        const profileDiv = screen.getByAltText('Profile Picture');
        
        expect(profileDiv).toBeInTheDocument()
    })

    it('Should not render the ProfilePopUpCard component by default', () => {
        renderWithContext(<Navbar isLoggedIn={false}/>, mockContextValue);

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

    it('Should render the ProfilePopUpCard Component if the user clicks their profile pic', async ()=> {
        const user = userEvent.setup();
        renderWithContext(<Navbar isLoggedIn={true}/>, mockContextValue)
        screen.debug();

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
    })
})
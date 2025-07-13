import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { expect, describe, it } from 'vitest';
import { UserDataContext } from '../../store/user-data-context.js';

function renderWithContext( isLoggedIn, userProfileData ) {
    return render(
        <UserDataContext value={{ userProfileData }}>
           <Navbar isLoggedIn={isLoggedIn} />
        </UserDataContext>
    )
}


// Mock user images data
const mockUserProfileData = {
  images: [
    { url: 'https://example.com/profile.jpg' }
  ]
}

describe('Navbar Component', () => { 
    it("Should render the login button if the user is not logged in", () => {
        render(<Navbar/>);

        const buttonElement = screen.getByRole('button', { name: "Login" });
        expect(buttonElement).toBeInTheDocument();
    })

    it("Should not render the login button if the user is logged in", async () => {
        render(<Navbar isLoggedIn={true}/>);

        const buttonElement = screen.queryByRole('button', { name: "Logged In" },);
        expect(buttonElement).toBe(null);
    })

    it('Should not render the "ProfilePopupCard" component if the user is not logged in and the userProfileData is not present', async () => {
        renderWithContext(false, {});

        const profileDiv = screen.queryByAltText('Profile Picture');
        expect(profileDiv).toBe(null);
    })

    it("Should not render the users profile image in the corner if the user is not logged in but the userProfileData is present", () => {
        renderWithContext(false, mockUserProfileData);

        const profileDiv = screen.queryByAltText('Profile Picture');
        expect(profileDiv).toBe(null);
    })
    
    it('Should not render the "ProfilePopupCard" component if the user is logged in but the userProfileData is an empty object', async () => {
        renderWithContext(true, {});
        
        const profileDiv = screen.queryByAltText('Profile Picture');
        expect(profileDiv).toBe(null);
    })

    it('Should render the "ProfilePopupCard" component if the user is logged in and the userProfileData is present', async () => {
        renderWithContext(true, mockUserProfileData);
    
        const profileDiv = screen.getByAltText('Profile Picture');
        expect(profileDiv).toBeInTheDocument()
    })
})
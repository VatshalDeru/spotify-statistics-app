import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';
import LogoutModal from '../LogoutModal/LogoutModal';
import { UserDataContext } from '../../store/user-data-context';
import { expect, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

const mockGetStartedClickContext = vi.fn();

const fetchedUserDataContextValue = {
    userListeningData: {
        isDataPresent: true,
        topArtists: {
            short_term: {},
        },
        topTracks: {
            short_term: {},
        },
        recentlyPlayedTracks: [],
    },
    getStartedClickContext: mockGetStartedClickContext,
}


// context value for when the user listening data has not been fetched
const userDataContextValue = {
    userListeningData: {
        isDataPresent: false,
        topArtists: {},
        topTracks: {},
        recentlyPlayedTracks: [],
    },
    getStartedClickContext: mockGetStartedClickContext,
}

const renderWithContext = (ui, contextValue) => {
    return render(<UserDataContext value={contextValue}>
        {ui}
    </UserDataContext>)
}

describe('HeroSection Component', () => {
    it('should render "Spotify"', () => {
        // Assign
        renderWithContext(<HeroSection/>, fetchedUserDataContextValue);

        // Assert
        const textElement = screen.getByText('Spotify');
        expect(textElement).toBeInTheDocument();
    });
    it('should render "Wrapped"', () => {
        // Assign
        render(<HeroSection/>);

        // Assert
        const textElement = screen.getByText('Wrapped');
        expect(textElement).toBeInTheDocument();
    });
    it('should not dislay the "get started" button if user is not logged in', () => {
        render(<HeroSection isLoggedIn={false}/>, userDataContextValue);

        const buttonElement = screen.queryByRole('button', { name: "Get Started" });

        expect(buttonElement).toBe(null);
    });
    it(`should display the "get started" button if the userListeningData hasn't been fetched yet`, () => {
        renderWithContext(<HeroSection isLoggedIn={true}/>, userDataContextValue);
        screen.debug();

        const buttonElement = screen.queryByRole('button', { name: 'Get Started' });

        expect(buttonElement).toBeInTheDocument();
    });
    it('should dislay the "get started" button if user is logged in', () => {
        render(<HeroSection isLoggedIn={true}/>)
        const buttonElement = screen.getByRole('button', { name: "Get Started" })

        expect(buttonElement).toBeInTheDocument();
    });
    it('should call the getStartedClickContext function when you click the "Get Started" button', async () => {
        renderWithContext(<HeroSection isLoggedIn={true}/>, userDataContextValue);

        const buttonElement = screen.getByRole('button', { name: 'Get Started' });

        await userEvent.click(buttonElement);

        expect(mockGetStartedClickContext).toHaveBeenCalled();
    });
})
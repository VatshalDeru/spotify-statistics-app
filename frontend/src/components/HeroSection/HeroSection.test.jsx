import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';
import { expect, describe, it } from 'vitest';

describe('HeroSection Component', () => {
    it('should render "Spotify"', () => {
        // Assign
        render(<HeroSection/>);

        // Assert
        const textElement = screen.getByText('Spotify');
        expect(textElement).toBeInTheDocument();
    })
    it('should render "Wrapped"', () => {
        // Assign
        render(<HeroSection/>);

        // Assert
        const textElement = screen.getByText('Wrapped');
        expect(textElement).toBeInTheDocument();
    })
    it('should not dislay the "get started" button if user is logged in', () => {
        render(<HeroSection/>);

        const buttonElement = screen.queryByRole('button', { name: "Get Started" });

        expect(buttonElement).toBe(null);
    })
    it('should dislay the "get started" button if user is logged in', () => {
        render(<HeroSection isLoggedIn={true}/>)
        const buttonElement = screen.getByRole('button', { name: "Get Started" })

        expect(buttonElement).toBeInTheDocument();
    })
})
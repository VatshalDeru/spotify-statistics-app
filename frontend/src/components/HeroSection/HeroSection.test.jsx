import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';
import { expect, test, describe } from 'vitest';

describe('HeroSection Component', () => {
    test('Spotify is rendered', () => {
        // Assign
        render(<HeroSection/>);

        // Assert
        const textElement = screen.getByText('Spotify');
        expect(textElement).toBeInTheDocument();
    })
    test('Wrapped is rendered', () => {
        // Assign
        render(<HeroSection/>);

        // Assert
        const textElement = screen.getByText('Wrapped');
        expect(textElement).toBeInTheDocument();
    })
    test('button that says Get Started is Rendered', () => {
        render(<HeroSection/>);

        const buttonElement = screen.getByRole('button', { name: "Get Started" });

        expect(buttonElement).toBeInTheDocument();
    })
    test((''))
})
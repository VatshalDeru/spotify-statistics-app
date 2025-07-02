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
})
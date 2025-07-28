import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import SearchResults from './SearchResults';

const mockQueriesArr = [
    {
        "trackName": "Headlines",
        "trackImage": "https://i.scdn.co/image/ab67616d0000b273c7ea04a9b455e3f68ef82550"
    },
    {
        "trackName": "Fancy",
        "trackImage": "https://i.scdn.co/image/ab67616d0000b27372babba16ea5e3afe690b4f1"
    },
    {
        "trackName": "Hell N Back (feat. Summer Walker)",
        "trackImage": "https://i.scdn.co/image/ab67616d0000b273864f946221840eced94a2243"
    },
    {
        "trackName": "Houston Old Head",
        "trackImage": "https://i.scdn.co/image/ab67616d0000b273c8ced8a4d6b6b61eb592f3dd"
    }
]

describe('SearchResults component', () => {
    it('should render the reuslts correctly if the queries are present', () => {
        render(<SearchResults queries={mockQueriesArr}/>)
        screen.debug();

        const resultItems = screen.getAllByRole('listitem');
        expect(resultItems).toHaveLength(4);

        mockQueriesArr.forEach(mockQuery => {
            const trackImg = screen.getByAltText(`image of ${mockQuery.trackName} track`);
            const trackName = screen.getByText(mockQuery.trackName)

            expect(trackImg).toBeInTheDocument();
            expect(trackImg).toHaveAttribute('src', mockQuery.trackImage)
            expect(trackName).toBeInTheDocument();
        })
    });
    it('should not render the results when no queries are present', () => {
        render(<SearchResults queries={[]}/>)
        screen.debug();

        const resultItems = screen.queryAllByRole('listitem');
        expect(resultItems).toHaveLength(0);
    });
});
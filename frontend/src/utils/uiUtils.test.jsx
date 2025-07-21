import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest';
import { createDataListHeader, getDisplayConfigText, isUserProfileDataComplete, isUserListeningDataComplete } from './uiUtils';


describe('createDataListHeader function', () => {
    it('should return the correct header for topArtists and short_term', () => {
        const result = createDataListHeader('topArtists', 'short_term');
        expect(result).toBe('Top Artists in the last 4 weeks')
    });
    it('should return the correct header for topTracks and medium_term', () => {
        const result = createDataListHeader('topTracks', 'medium_term');
        expect(result).toBe('Top Tracks in the last 6 months')
    });
    it('should return the correct header for recentlyPlayedTracks', () => {
        const result = createDataListHeader('recentlyPlayedTracks');
        expect(result).toBe('Recently Played Tracks')
    });
    it('should log an error and return undefined when invalid params are passesd', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const result = createDataListHeader('', '');

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith('incorect dataType or timeRange provided.');
        consoleSpy.mockRestore();
    })
    it('should log an error and return undefined when invalid dataType is provided', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const result = createDataListHeader('asdf', 'short_term');

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith('incorect dataType provided.');
        consoleSpy.mockRestore();
    })
    it('should log an error and return undefined when invalid timeRange is provided', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const result = createDataListHeader('topArtists', 'asdf');

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith('incorect timeRange provided.');
        consoleSpy.mockRestore();
    })
});

describe('getDisplayConfigText function', () => {
    it('should return the correct value for valid keys', () => {
        expect(getDisplayConfigText('topArtists')).toBe('Top Artists');
        expect(getDisplayConfigText('topTracks')).toBe('Top Tracks');
        expect(getDisplayConfigText('recentlyPlayedTracks')).toBe('Recently Played');
        expect(getDisplayConfigText('short_term')).toBe('4 Weeks');
        expect(getDisplayConfigText('medium_term')).toBe('6 Months');
        expect(getDisplayConfigText('long_term')).toBe('12 Months');
    });
    it('should log error and return undefined if invalid key provided', () =>{
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        const result = getDisplayConfigText('');

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    })
});

describe('isUserProfileDataComplete function', () => {
    it('should return true when all required fields exist', () => {
        const mockProfileData = {
          external_urls: { spotify: 'url' },
          images: [{ url: 'imageUrl' }],
          display_name: 'Name',
          id: '123',
          followers: { total: 0 },
        }
        const result = isUserProfileDataComplete(mockProfileData);
        expect(result).toBe(true);
    })
    it('should return undefined if an required fields are missing', () => {
        const mockProfileData = {
          external_urls: { spotify: 'url' },
          images: [],
          display_name: '',
          id: null,
          followers: { },
        }
        const result = isUserProfileDataComplete(mockProfileData);
        expect(result).toBeUndefined();
    })
    it('should return false if no value is passed to function', () => {
        const result = isUserProfileDataComplete();
        expect(result).toBe(false);
    })
});

describe('isUserListeningDataComplete', () => {     
    it('should return true if data is complete' , () => {
        const mockListeningDataValue = {
            topArtists: {
                short_term: Array(20).fill({}),
                medium_term: Array(20).fill({}),
                long_term: Array(20).fill({}),
            },
            topTracks: {
                short_term: Array(20).fill({}),
                medium_term: Array(20).fill({}),
                long_term: Array(20).fill({}),
            },
            recentlyPlayedTracks: Array(20).fill({}),
        };
        const result = isUserListeningDataComplete(mockListeningDataValue);
        expect(result).toBe(true);
    });
    it('should return false if data is not complete', () => {
        const mockListeningDataValue = {
            topArtists: {
                short_term: [],
                medium_term: [],
                long_term: [],
            },
            topTracks: {
                short_term: [],
                medium_term: [],
                long_term: [],
            },
            recentlyPlayedTracks: [],
        };
        const result = isUserListeningDataComplete(mockListeningDataValue);
        expect(result).toBe(false);
    });
    it('should return false if not value is passed to the function', () => {
        const result = isUserListeningDataComplete();
        expect(result).toBe(false);
    })
 })
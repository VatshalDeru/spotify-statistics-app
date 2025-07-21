import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { checkTokenIsFresh } from './authUtils';
import { fetchHandler } from './http.js';
import { waitFor } from '@testing-library/react';

const mockCheckTokenIsFresh = vi.fn();
window.fetch = vi.fn();

describe('getUserProfileHandler function', () => {
    it('should return truthy data and error as null on sucess', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ status: 'success'}),
        })

        console.log(typeof fetch)
        const result = await fetchHandler({url: 'http://localhost:5173'});

        expect(fetch).toHaveBeenCalledWith('http://localhost:5173', {})
        expect(result).toEqual({ data: { status: 'success' }, error: null });
    }),
    it('should log error and return truthy error and null data', () => {
        fetch.mockResolvedValue({
            ok: false,
            text: () => Promise.resolve('error occurred'),
        })
    })
})
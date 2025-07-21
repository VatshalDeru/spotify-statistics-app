import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { checkTokenIsFresh } from './authUtils';
import { fetchHandler, getUserProfileHandler, loginFn } from './http.js';
// import { waitFor } from '@testing-library/react';
// import * as http from './http.js'

// const mockCheckTokenIsFresh = vi.fn();
window.fetch = vi.fn();

describe('fetchHandler function', () => {
    it('should return truthy data and error as null on sucess', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ status: 'success'}),
        })

        console.log(typeof fetch)
        const result = await fetchHandler({url: 'http://localhost:3000'});

        expect(fetch).toHaveBeenCalledWith('http://localhost:3000', {})
        expect(result).toEqual({ data: { status: 'success' }, error: null });
    }),
    it('should log error and return truthy error and null data on failure of request', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        fetch.mockResolvedValue({
            ok: false,
            text: () => Promise.resolve('error occurred'),
            status: 400
        })

        console.log(typeof fetch)
        const result = await fetchHandler({url: 'http://localhost:5173', errorIntro: 'custom error'});

        const error = new Error('custom error, error status: 400, error message: error occurred')
        expect(result).toEqual({ data: null, error });
        expect(consoleErrorSpy).toHaveBeenCalledWith(error.message);
    });
    it('passes method, headersObj and bodyObj correctly', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        });

        const input = {
            url: 'http://localhost:3000',
            method: 'POST',
            bodyObj: JSON.stringify({ test: true }),
            headersObj: { 'Content-Type': 'application/json' },
            errorIntro: 'Error',
        };

        await fetchHandler(input);

        expect(fetch).toHaveBeenCalledWith('http://localhost:3000', {
            method: 'POST',
            body: JSON.stringify({ test: true }),
            headers: { 'Content-Type': 'application/json' },
        });
  });
});

// describe('getUserProfileHandler function', () => {
//     // vi.mock('./http.js');

//     it('should call fetchHandler with correct values', async () => {
//         const fetchHandlerSpy = vi.spyOn(http, 'fetchHandler');

//         await http.getUserProfileHandler();
    
//         expect(fetchHandlerSpy).toHaveBeenCalled()
//     })
// })

// Partial mock of http.js
// vi.mock('./http.js', async () => {
//   const actual = await vi.importActual('./http.js');
//   return {
//     ...actual,
//     fetchHandler: vi.fn(),  // override fetchHandler with a mock function
//   };
// });


// describe('loginFn function', () => {
//     it('calls fetchHandler()', async () => {
//     const fetchHandlerSpy = vi.spyOn(http, 'fetchHandler').mockResolvedValue({
//       data: { authURL: 'http://example.com', state: 'abc123' },
//       error: null,
//     });
//         await http.loginFn();
//         // fetchHandler()
//         expect(fetchHandlerSpy).toHaveBeenCalled()
//     })
// })
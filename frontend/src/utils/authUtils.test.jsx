// import '@testing-library/jest-dom';
// import { describe, expect, it, vi } from "vitest";
// import * as utils from './authUtils';

// describe('checkURLforParams function', () => {
//     vi.mock('./authUtils', async () => {
//         const actual = await vi.importActual('./authUtils.js'); 
//         return {
//             ...actual,
//             checkForStateMismatch: vi.fn(() => ({ status: 'error'})),
//         }
//     })
//     it('should return false if checkStateForMismatch returns false', () => {
//             // const checkStateForMismatchSpy = vi.spyOn(utils, 'checkForStateMismatch').mockReturnValue(true);

//             const result = utils.checkURLforParams();
//             expect(result).toEqual({ status: 'error' });
//     })
// })
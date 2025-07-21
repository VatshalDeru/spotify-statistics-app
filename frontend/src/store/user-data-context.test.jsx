// import '@testing-library/jest-dom'
// import { render, screen, waitFor } from '@testing-library/react';
// import { describe, it, expect, vi, beforeEach} from 'vitest';
// import UserDataContextProvider, { UserDataContext } from './user-data-context';
// import { NotificationContext } from './notification-context';
// import { useContext } from 'react';
// import userEvent from '@testing-library/user-event';
// import { ensureFreshToken } from '../utils/authUtils';

// // const mockUserDataHandler = vi.fn();
// // const mockUserProfileHandler = vi.fn();
// import { getUserDataHandler, getUserProfileHandler } from '../utils/http';
// vi.mock('../utils/http', () => ({
//   getUserDataHandler: vi.fn(),
//   getUserProfileHandler: vi.fn(),
// }));



// const mockGetStartedClickContextFn = vi.fn();
// const mockGetUserProfileContextFn = vi.fn();
// const mockUserDataContextValue = {
//     userListeningData: {
//       isDataPresent: false,
//       topArtists: {},
//       topTracks: {},
//       recentlyPlayedTracks: [],
//     },
//     isProfileDataPresent: false,
//     userProfileData: {},
//     getStartedClickContextFn: mockGetStartedClickContextFn,
//     getUserProfileContextFn: mockGetUserProfileContextFn,
// };

// // 🔧 Test Component that uses the context
// function TestComponent({logoutModal}) {
//   const { userListeningData, getStartedClickContextFn, getUserProfileContextFn } = useContext(UserDataContext);
//   const data = useContext(UserDataContext);

//   console.log(data.getStartedClickContextFn)  
//   return (
//     <>
//       <button onClick={() => getStartedClickContextFn(logoutModal)}>
//         fetch user listening data
//       </button>
//       <button onClick={() => getUserProfileContextFn(logoutModal)}>
//         fetch user profile data
//       </button>
//       <div data-testid="data-present">{userListeningData.isDataPresent.toString()}</div>
//     </>
//   );
// }


// const mockShowNotification = vi.fn();
// const logoutModal = {
//   current: {
//     showModal: vi.fn(),
//   }
// }

// const renderWithMockContext = (contextValue) => {
//   render(
//     <NotificationContext value={{ showNotification: mockShowNotification }}>
//       <UserDataContext value={contextValue}>
//         <TestComponent logoutModal={logoutModal} />
//       </UserDataContext>
//     </NotificationContext>
//   );
// }

// const renderWithRealContext = () => {
//   render(
//     <NotificationContext value={{ showNotification: mockShowNotification }}>
//       <UserDataContextProvider>
//         <TestComponent logoutModal={logoutModal} />
//       </UserDataContextProvider>
//     </NotificationContext>
//   );
// }

// // describe('UserDataContextProvider', () => {
// //   it('passes context to other components', async () => {
// //     renderWithMockContext(mockUserDataContextValue);

// //     const listeningDataBtn = screen.getByRole('button', { name: 'fetch user listening data' });
// //     const profileDataBtn = screen.getByRole('button', { name: 'fetch user profile data' });
// //     const dataPresentDiv = screen.getByTestId('data-present');

// //     expect(listeningDataBtn).toBeInTheDocument();
// //     expect(profileDataBtn).toBeInTheDocument();
// //     expect(dataPresentDiv).toBeInTheDocument();

// //     await userEvent.click(listeningDataBtn);
// //     await userEvent.click(profileDataBtn);

// //     expect(mockGetStartedClickContextFn).toHaveBeenCalled();
// //     expect(mockGetUserProfileContextFn).toHaveBeenCalled();
// //   });
// //   it('should call getUserDataHandler', async () => {
// //     renderWithRealContext();
// //     screen.debug();
// //     const listeningDataBtn = screen.getByRole('button', { name: '' })
// //   });

//   // it('should not fetch data if token is expired', async () => {
//   // });
// });
// 
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest'
import { NotificationContext } from './notification-context';
import { render, screen } from '@testing-library/react';
import NotificationContextProvider from './notification-context';
import { useContext } from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

const mockShowNotification = vi.fn();
const mockClearNotification = vi.fn();

// sets properties to received params
const mockNotificationContextValueFn = ( requestState = null, title = '', message = '') =>({
    requestState, // pending, success or error
    title,
    message,
    showNotification: mockShowNotification,
    clearNotification: mockClearNotification,
});


const TestWrapper = () => {
   const { requestState, title, message, showNotification, clearNotification } = useContext(NotificationContext);
//    const data = useContext(NotificationContext);
    
//    console.log(data.showNotification);
   return (
    <div>
        <h1>{requestState}</h1>
        <h2>{title}</h2>
        <h3>{message}</h3>
        <button onClick={() => showNotification('pending', 'Pending:', 'pending message')}>show pending</button>
        <button onClick={() => showNotification('success', 'Success:', 'success message')}>show success</button>
        <button onClick={() => showNotification('error', 'Error:', 'error message')}>show error</button>
        <button onClick={clearNotification}>clear</button>
    </div>
   )
}

const renderWithMockContext = (contextValue) => {
    return render(<NotificationContext value={contextValue}>
        <TestWrapper/>
    </NotificationContext>);
};

const renderWithRealContext = () => {
    return render(<NotificationContextProvider>
        <TestWrapper/>
    </NotificationContextProvider>)
}

describe('NotificationContextProvider component', () => {
    it('should provide context to other component', async() => {
        renderWithMockContext(mockNotificationContextValueFn());
        screen.debug();

        const stateHeader = screen.getByRole('heading', { level: 1, name: '' });
        const titleHeader = screen.getByRole('heading', { level: 2, name: '' });
        const messageHeader = screen.getByRole('heading', { level: 3, name: '' });
        const showPendingBtn = screen.getByRole('button', { name: 'show pending' });
        const clearBtn = screen.getByRole('button', { name: 'clear' });

        expect(stateHeader).toBeInTheDocument();
        expect(titleHeader).toBeInTheDocument();
        expect(messageHeader).toBeInTheDocument();

        await userEvent.click(showPendingBtn);
        expect(mockShowNotification).toHaveBeenCalled();

        await userEvent.click(clearBtn);
        expect(mockClearNotification).toHaveBeenCalled();

    })
    it('should change the requestState, title, message when the pending button is pressed', async () => {
        renderWithRealContext();
        screen.debug();
        // checks to see if it has default values first
        const defaultStateHeader = screen.getByRole('heading', { level: 1, name: '' });
        const defaultTitleHeader = screen.getByRole('heading', { level: 2, name: '' });
        const defaultMessageHeader = screen.getByRole('heading', { level: 3, name: '' });

        expect(defaultStateHeader).toBeInTheDocument();
        expect(defaultTitleHeader).toBeInTheDocument();
        expect(defaultMessageHeader).toBeInTheDocument();
        

        const pendingBtn = screen.getByRole('button', { name: 'show pending' });
        await userEvent.click(pendingBtn);

        const successStateHeader = screen.getByRole('heading', { level: 1, name: 'pending' });
        const successTitleHeader = screen.getByRole('heading', { level: 2, name: 'Pending:' });
        const successMessageHeader = screen.getByRole('heading', { level: 3, name: 'pending message' });

        expect(successStateHeader).toBeInTheDocument();
        expect(successTitleHeader).toBeInTheDocument();
        expect(successMessageHeader).toBeInTheDocument();
    })
    it('should change the requestState, title, message when the success button is pressed', async () => {
        renderWithRealContext();

        // checks to see if it has default values first
        const defaultStateHeader = screen.getByRole('heading', { level: 1, name: '' });
        const defaultTitleHeader = screen.getByRole('heading', { level: 2, name: '' });
        const defaultMessageHeader = screen.getByRole('heading', { level: 3, name: '' });

        expect(defaultStateHeader).toBeInTheDocument();
        expect(defaultTitleHeader).toBeInTheDocument();
        expect(defaultMessageHeader).toBeInTheDocument();
        

        const successBtn = screen.getByRole('button', { name: 'show success' });
        await userEvent.click(successBtn);

        const successStateHeader = screen.getByRole('heading', { level: 1, name: 'success' });
        const successTitleHeader = screen.getByRole('heading', { level: 2, name: 'Success:' });
        const successMessageHeader = screen.getByRole('heading', { level: 3, name: 'success message' });

        expect(successStateHeader).toBeInTheDocument();
        expect(successTitleHeader).toBeInTheDocument();
        expect(successMessageHeader).toBeInTheDocument();
    })
    it('should change the requestState, title, message when the error button is pressed', async () => {
        renderWithRealContext();

        // checks to see if it has default values first
        const defaultStateHeader = screen.getByRole('heading', { level: 1, name: '' });
        const defaultTitleHeader = screen.getByRole('heading', { level: 2, name: '' });
        const defaultMessageHeader = screen.getByRole('heading', { level: 3, name: '' });

        expect(defaultStateHeader).toBeInTheDocument();
        expect(defaultTitleHeader).toBeInTheDocument();
        expect(defaultMessageHeader).toBeInTheDocument();
        

        const errorBtn = screen.getByRole('button', { name: 'show error' });
        await userEvent.click(errorBtn);

        const successSstateHeader = screen.getByRole('heading', { level: 1, name: 'error' });
        const successTitleHeader = screen.getByRole('heading', { level: 2, name: 'Error:' });
        const successMessageHeader = screen.getByRole('heading', { level: 3, name: 'error message' });

        expect(successSstateHeader).toBeInTheDocument();
        expect(successTitleHeader).toBeInTheDocument();
        expect(successMessageHeader).toBeInTheDocument();
    })
// it('should persist the pending state even after 3 seconds', async () => {
//   vi.useFakeTimers();
//   renderWithRealContext();

//   const pendingBtn = screen.getByRole('button', { name: 'show pending' });
//   await userEvent.click(pendingBtn);

//   const pendingStateHeader = screen.getByRole('heading', { level: 1 });
//   const pendingTitleHeader = screen.getByRole('heading', { level: 2 });
//   const pendingMessageHeader = screen.getByRole('heading', { level: 3 });

//   expect(pendingStateHeader).toHaveTextContent('pending');
//   expect(pendingTitleHeader).toHaveTextContent('Pending:');
//   expect(pendingMessageHeader).toHaveTextContent('pending message');


//   expect(pendingStateHeader).toHaveTextContent('pending');
//   expect(pendingTitleHeader).toHaveTextContent('Pending:');
//   expect(pendingMessageHeader).toHaveTextContent('pending message');

//   vi.useRealTimers();
// });

});
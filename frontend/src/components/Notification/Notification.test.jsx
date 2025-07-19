import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { NotificationContext } from '../../store/notification-context';
import Notification from './Notification';

const mockNullNotificationContextValue = {
    requestState: null, // pending, success or error
};
const mockPendingNotificationContextValue = {
    requestState: 'pending', // pending, success or error
};
const mockSuccessNotificationContextValue = {
    requestState: 'success', // pending, success or error
};
const mockErrorNotificationContextValue = {
    requestState: 'error', // pending, success or error
};

const renderWithContext = (ui, contextValue) => {
    return render(<NotificationContext value={contextValue}>
        {ui}
    </NotificationContext>)
};

describe('Notification component', () => {
    it("should not show the Notification component on screen when request state is null", () => {
        renderWithContext(<Notification/>, mockNullNotificationContextValue);

        const notificationDiv = screen.getByTestId('notification-div');

        expect(notificationDiv).not.toHaveClass('visible');
    });
    it('should show the Notification component on screen with the "visible" class and style with "pending" class when state is "pending"', () => {
        renderWithContext(<Notification/>, mockPendingNotificationContextValue);

        const notificationDiv = screen.getByTestId('notification-div');

        expect(notificationDiv).toHaveClass('visible');
        expect(notificationDiv).toHaveClass('pending');
    });
    it('should show the Notification component on screen with the "visible" class and style with "success" class when state is "success"', () => {
        renderWithContext(<Notification/>, mockSuccessNotificationContextValue);

        const notificationDiv = screen.getByTestId('notification-div');

        expect(notificationDiv).toHaveClass('visible');
        expect(notificationDiv).toHaveClass('success');
    });
    it('should show the Notification component on screen with the "visible" class and style with "error" class when state is "error"', () => {
        renderWithContext(<Notification/>, mockErrorNotificationContextValue);

        const notificationDiv = screen.getByTestId('notification-div');

        expect(notificationDiv).toHaveClass('visible');
        expect(notificationDiv).toHaveClass('error');
    });
})
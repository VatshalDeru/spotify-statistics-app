import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import LogoutModal from './LogoutModal';

describe('LogoutModal component', () => {
  it('renders modal content when showModal is called', async () => {
    const logoutModal = createRef();
    render(<LogoutModal ref={logoutModal} setIsLoggedIn={() => {}} />);

    logoutModal.current.showModal();

    const header = screen.getByText('Session Expired');
    const instruction = screen.getByText('Please logout');
    const logoutButton = screen.getByText('Logout');

    expect(header).toBeInTheDocument();
    expect(instruction).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});

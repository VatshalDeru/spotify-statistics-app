import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { expect, test, describe } from 'vitest';

describe('Navbar Component', () => { 
    test("Checks if the login button says Login when first rendered", () => {
        render(<Navbar/>);

        const buttonElement = screen.getByRole('button', { name: "Login" });
        expect(buttonElement).toBeInTheDocument();
    })
    // test("Checks if the Logged In", async () => {
    //     render(<Navbar/>);

    //     const buttonElement = await screen.findAllByRole('button', { name: "Logged In" },);
    //     expect(buttonElement).toBeInTheDocument();
    // })
})
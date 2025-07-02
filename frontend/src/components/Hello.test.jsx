import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Hello from './Hello.jsx'

describe('Hello Component', () => {
    test('renders Hello component', () => {
    render(<Hello />)

    const helloElement = screen.getByText(/hello/i)
    expect(helloElement).toBeInTheDocument();
  })
})


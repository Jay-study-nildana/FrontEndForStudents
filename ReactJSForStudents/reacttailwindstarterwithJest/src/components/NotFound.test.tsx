// import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound component', () => {
  test('renders the "Page not found" message', () => {
    render(<NotFound />);

    const message = screen.getByText(/page not found/i);
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('text-center');
    expect(message).toHaveClass('py-8');
  });
});
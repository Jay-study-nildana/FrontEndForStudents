// import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter component', () => {
  test('renders label and initial count', () => {
    render(<Counter initialCount={5} label="My counter" />);

    expect(screen.getByText('My counter')).toBeInTheDocument();
    expect(screen.getByTestId('count')).toHaveTextContent('5');
    expect(screen.getByRole('button', { name: /increment/i })).toBeInTheDocument();
  });

  test('increments the count when the button is clicked', async () => {
    render(<Counter initialCount={0} />);

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /increment/i });
    const count = screen.getByTestId('count');

    expect(count).toHaveTextContent('0');

    await user.click(button);
    expect(count).toHaveTextContent('1');

    await user.click(button);
    expect(count).toHaveTextContent('2');
  });
});
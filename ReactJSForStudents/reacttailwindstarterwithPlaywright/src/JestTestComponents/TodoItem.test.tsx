// import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from './TodoItem';

describe('TodoItem component', () => {
  test('renders text and checkbox state', () => {
    render(
      <TodoItem id="1" text="Buy milk" completed={true} onToggle={() => {}} onDelete={() => {}} />
    );

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test('calls onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();

    render(<TodoItem id="2" text="Read book" onToggle={onToggle} onDelete={() => {}} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith('2');
  });

  test('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = jest.fn();

    render(<TodoItem id="3" text="Clean room" onToggle={() => {}} onDelete={onDelete} />);

    const deleteButton = screen.getByRole('button', { name: /delete-3/i });
    await user.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith('3');
  });

  test('adds line-through class when completed is true', () => {
    render(<TodoItem id="4" text="Walk dog" completed={true} onToggle={() => {}} onDelete={() => {}} />);

    const textEl = screen.getByText('Walk dog');
    expect(textEl).toHaveClass('line-through');
  });
});
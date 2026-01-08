// ...existing code...
// import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home page', () => {
  test('renders main heading and introductory paragraph', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', { name: /welcome home/i, level: 2 })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/A Tailwind v4 playground showcasing responsive layout, components and utilities\./i)
    ).toBeInTheDocument();

    const section = screen.queryByRole('region') || document.querySelector('section');
    // Fallback to checking for the section element if region role isn't present
    expect(section).toBeTruthy();
  });

  test('renders Core Features card and its list items', () => {
    render(<Home />);

    const coreHeading = screen.getByRole('heading', { name: /core features/i });
    expect(coreHeading).toBeInTheDocument();

    expect(screen.getByText(/Responsive grid and utility-first styling/i)).toBeInTheDocument();
    expect(screen.getByText(/Accessible forms and focus states/i)).toBeInTheDocument();
    expect(screen.getByText(/Dark mode support/i)).toBeInTheDocument();
  });

  test('renders Get started card with Explore button and gradient background', () => {
    render(<Home />);

    const getStartedHeading = screen.getByRole('heading', { name: /get started/i });
    expect(getStartedHeading).toBeInTheDocument();

    const exploreButton = screen.getByRole('button', { name: /explore/i });
    expect(exploreButton).toBeInTheDocument();

    // The Get started container uses a gradient background class
    const container = getStartedHeading.parentElement;
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('bg-gradient-to-tr');
  });

  test('renders three feature boxes (Responsive, Accessible, Customizable)', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { name: /responsive/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /accessible/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /customizable/i })).toBeInTheDocument();

    expect(screen.getByText(/Layouts adapt to any screen\./i)).toBeInTheDocument();
    expect(screen.getByText(/Focus rings and semantic markup\./i)).toBeInTheDocument();
    expect(screen.getByText(/Utility classes you can extend\./i)).toBeInTheDocument();
  });
});
// ...existing code...
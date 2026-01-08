// import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About page', () => {
  test('renders main heading and introductory paragraph', () => {
    const { container } = render(<About />);

    expect(
      screen.getByRole('heading', { name: /about this project/i, level: 2 })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/This demo showcases Tailwind v4 utilities/i)
    ).toBeInTheDocument();

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('prose');
  });

  test('renders Mission and Tech stack cards with expected content', () => {
    render(<About />);

    expect(screen.getByRole('heading', { name: /mission/i })).toBeInTheDocument();
    expect(screen.getByText(/Provide a compact, reusable UI kit/i)).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /tech stack/i })).toBeInTheDocument();
    expect(screen.getByText('React + TypeScript')).toBeInTheDocument();
    expect(screen.getByText(/Tailwind CSS v4/i)).toBeInTheDocument();
  });

  test('renders Team card with gradient background', () => {
    render(<About />);

    const teamHeading = screen.getByRole('heading', { name: /team/i });
    expect(teamHeading).toBeInTheDocument();

    // The container div for the Team section includes the gradient classes
    const teamContainer = teamHeading.parentElement;
    expect(teamContainer).toBeInTheDocument();
    expect(teamContainer).toHaveClass('bg-gradient-to-br');
  });
});
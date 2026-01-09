// import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('renders footer landmark and current year', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    const year = new Date().getFullYear().toString();
    expect(footer).toHaveTextContent(year);
  });

  test('renders privacy, terms, and support links with correct hrefs', () => {
    render(<Footer />);

    const privacyLink = screen.getByRole('link', { name: /privacy/i });
    const termsLink = screen.getByRole('link', { name: /terms/i });
    const supportLink = screen.getByRole('link', { name: /support/i });

    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
    expect(supportLink).toBeInTheDocument();

    expect(privacyLink).toHaveAttribute('href', '#');
    expect(termsLink).toHaveAttribute('href', '#');
    expect(supportLink).toHaveAttribute('href', '#');
  });
});
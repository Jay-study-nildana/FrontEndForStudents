// import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from './Contact';

describe('Contact page', () => {
  test('renders main heading and introductory paragraph', () => {
    const { container } = render(<Contact />);

    expect(
      screen.getByRole('heading', { name: /contact us/i, level: 2 })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /We’re here to help\. Reach out with questions, feedback, or partnership inquiries/i
      )
    ).toBeInTheDocument();

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('prose');
  });

  test('renders Support card with mail and phone links', () => {
    render(<Contact />);

    const supportHeading = screen.getByRole('heading', { name: /support/i });
    expect(supportHeading).toBeInTheDocument();

    const mailLink = screen.getByRole('link', { name: /support@example\.com/i });
    expect(mailLink).toBeInTheDocument();
    expect(mailLink).toHaveAttribute('href', 'mailto:support@example.com');

    const phoneLink = screen.getByRole('link', { name: /\+1 \(234\) 567-890/i });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', 'tel:+1234567890');
  });

  test('renders Head Office address and partnerships email', () => {
    render(<Contact />);

    const officeHeading = screen.getByRole('heading', { name: /head office/i });
    expect(officeHeading).toBeInTheDocument();

    expect(screen.getByText(/123 Tailwind Lane/i)).toBeInTheDocument();
    expect(screen.getByText(/Example City, EX 12345/i)).toBeInTheDocument();

    const partnershipsLink = screen.getByRole('link', { name: /partnerships@example\.com/i });
    expect(partnershipsLink).toBeInTheDocument();
    expect(partnershipsLink).toHaveAttribute('href', 'mailto:partnerships@example.com');
  });

  test('renders Quick links and gradient container', () => {
    render(<Contact />);

    const quickLinksHeading = screen.getByRole('heading', { name: /quick links/i });
    expect(quickLinksHeading).toBeInTheDocument();

    // Quick links should include the expected items
    expect(screen.getByRole('link', { name: /help center/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /privacy & terms/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /status/i })).toBeInTheDocument();

    // The Quick links container uses a gradient background
    const quickLinksContainer = quickLinksHeading.parentElement;
    expect(quickLinksContainer).toBeInTheDocument();
    expect(quickLinksContainer).toHaveClass('bg-gradient-to-br');
  });
});
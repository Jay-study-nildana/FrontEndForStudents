// import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  test('renders brand, description and navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Tailwind Playground/i)).toBeInTheDocument();
    expect(screen.getByText(/Small demo with Home \/ About \/ Contact/i)).toBeInTheDocument();

    // Links appear for Home / About / Contact (desktop + mobile produce duplicates in DOM)
    const links = screen.getAllByRole('link', { name: /(home|about|contact)/i });
    expect(links.length).toBeGreaterThanOrEqual(3);

    // Ensure at least one Home link exists
    expect(screen.getAllByText(/Home/i)[0]).toBeInTheDocument();
  });

  test('applies active styling to the current route link', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Navbar />
      </MemoryRouter>
    );

    // There may be multiple "About" link nodes (desktop + mobile). Find one with the active class.
    const aboutLinks = screen.getAllByRole('link', { name: /about/i });
    const activeAbout = aboutLinks.find((el) => el.classList.contains('bg-indigo-600'));

    expect(activeAbout).toBeDefined();
    expect(activeAbout).toHaveClass('bg-indigo-600');
  });

  test('mobile menu toggles open and closed when hamburger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );

    // The hamburger button toggles aria-expanded and the button label
    const toggleButton = screen.getByRole('button', { name: /open menu/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Open menu
    await user.click(toggleButton);

    // After click the button label should change and aria-expanded should be true
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    );

    // Find the mobile menu link node (one of the "Home" links lives inside the mobile menu wrapper)
    const homeLinks = screen.getAllByText(/Home/i);
    const mobileHomeLink = homeLinks.find((el) => {
      let node: HTMLElement | null = el as HTMLElement;
      while (node) {
        if (node.classList && Array.from(node.classList).includes('bg-white/95')) return true;
        node = node.parentElement;
      }
      return false;
    });

    expect(mobileHomeLink).toBeDefined();

    // Find the absolute container (parent of the bg-white/95 wrapper) and assert it has the "open" classes
    let node = mobileHomeLink as HTMLElement;
    let absoluteContainer: HTMLElement | null = null;
    while (node) {
      if (node.classList && node.classList.contains('absolute')) {
        absoluteContainer = node;
        break;
      }
      node = node.parentElement as HTMLElement;
    }

    expect(absoluteContainer).toBeTruthy();
    // When open the container should include the opacity-100 class
    expect(absoluteContainer).toHaveClass('opacity-100');

    // Close menu
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    await user.click(closeButton);

    // After closing, the toggle should reflect closed state
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute('aria-expanded', 'false');

    // The absolute container should now include the closed opacity class (opacity-0)
    expect(absoluteContainer).toHaveClass('opacity-0');
  });
});
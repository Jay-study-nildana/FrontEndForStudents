import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  test('renders brand, description and navigation links', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Tailwind Playground/i)).toBeInTheDocument();
    expect(screen.getByText(/Small demo with Home \/ About \/ Contact/i)).toBeInTheDocument();

    const links = screen.getAllByRole('link', { name: /(home|about|contact)/i });
    expect(links.length).toBeGreaterThanOrEqual(3);

    expect(screen.getAllByText(/Home/i)[0]).toBeInTheDocument();

    // ensure mobile menu container exists in DOM (hidden by classes)
    const absoluteContainer = container.querySelector('.absolute');
    expect(absoluteContainer).toBeTruthy();
  });

  test('applies active styling to the current route link', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Navbar />
      </MemoryRouter>
    );

    const aboutLinks = screen.getAllByRole('link', { name: /about/i });
    const activeAbout = aboutLinks.find((el) =>
      el.className.split(/\s+/).includes('bg-indigo-600')
    );

    expect(activeAbout).toBeDefined();
    expect(activeAbout).toHaveClass('bg-indigo-600');
  });

  test('mobile menu toggles open and closed when hamburger is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole('button', { name: /open menu/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Open menu
    await user.click(toggleButton);

    const closeButton = screen.getByRole('button', { name: /close menu/i });
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');

    // Find mobile menu link node and absolute container via DOM (class names used by component)
    const mobileMenuContainer = container.querySelector('.absolute');
    expect(mobileMenuContainer).toBeTruthy();
    expect(mobileMenuContainer).toHaveClass('opacity-100');

    // Ensure a mobile-specific link (bg-white/95 wrapper) exists
    const mobileHome = Array.from(container.querySelectorAll('a')).find((a) =>
      a.className.includes('text-left') || a.getAttribute('href') === '/'
    );
    expect(mobileHome).toBeDefined();

    // Close menu
    await user.click(closeButton);
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    // Closed state should include opacity-0
    expect(mobileMenuContainer).toHaveClass('opacity-0');
  });
});
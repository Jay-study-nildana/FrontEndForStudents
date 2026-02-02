// import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
      : "text-gray-700 dark:text-gray-200 hover:text-blue-600 pb-1";

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold">MySite</div>
        <div className="flex items-center gap-6 whitespace-nowrap">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

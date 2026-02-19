import { useState, type JSX } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

/**
 * Navbar no longer needs a setRoute prop.
 * Use NavLink for active styling and normal Link behavior.
 */
export default function Navbar(): JSX.Element {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, getEmail, logout } = useAuth();

  const NavButton = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded ${
          isActive ? "bg-indigo-600 text-white" : "bg-white/80 dark:bg-white/6"
        }`
      }
      onClick={() => setOpen(false)}
    >
      {children}
    </NavLink>
  );

  return (
    <header className="w-full px-2 py-4 z-50 fixed top-0 left-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-md">
      <nav className="flex items-center justify-between relative">
        <div className="flex items-center gap-3 mr-auto md:mr-12">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow">
            <span className="text-white font-bold">TW</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">
              F1 Themed Demo
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-300">
              A React JS Tailwind playground with F1 theme
            </p>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-3">
          <NavButton to="/">Home</NavButton>
          <NavButton to="/f1">F1 (FileData)</NavButton>
          <NavButton to="/f1-service">F1 (Service)</NavButton>
          <NavButton to="/tailwindhq">TailwindHQ</NavButton>
          {/* Auth section */}
          <div className="ml-4 flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <NavButton to="/profile">
                  <span className="px-3 py-2 rounded bg-green-100 text-green-800 font-semibold">
                    {getEmail()}
                  </span>
                </NavButton>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded bg-red-100 text-red-800 font-semibold hover:bg-red-200 transition"
                  title="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavButton to="/login">Login</NavButton>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-md bg-white/80 dark:bg-white/6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {open ? (
              <svg
                className="w-5 h-5 text-slate-900 dark:text-slate-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-slate-900 dark:text-slate-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          <div
            className={`absolute -left-6 -right-6 top-full mt-2 px-6 z-50 transform-gpu transition-all duration-200 origin-top ${
              open
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-white/95 dark:bg-slate-800 rounded-xl shadow-md p-4 flex flex-col gap-3 w-full">
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-indigo-600 text-white" : ""
                  } px-3 py-2 rounded text-left`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-indigo-600 text-white" : ""
                  } px-3 py-2 rounded text-left`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-indigo-600 text-white" : ""
                  } px-3 py-2 rounded text-left`
                }
              >
                Contact
              </NavLink>
              <NavLink
                to="/tailwindhq"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-indigo-600 text-white" : ""
                  } px-3 py-2 rounded text-left`
                }
              >
                TailwindHQ
              </NavLink>
              {/* Auth section for mobile */}
              <div className="mt-2 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <NavLink
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `${isActive ? "bg-indigo-600 text-white" : ""} px-3 py-2 rounded text-left bg-green-100 text-green-800 font-semibold`
                      }
                    >
                      {getEmail()}
                    </NavLink>
                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="block w-full px-3 py-2 rounded bg-red-100 text-red-800 font-semibold hover:bg-red-200 transition text-left"
                      title="Logout"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `${isActive ? "bg-indigo-600 text-white" : ""} px-3 py-2 rounded text-left`
                    }
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

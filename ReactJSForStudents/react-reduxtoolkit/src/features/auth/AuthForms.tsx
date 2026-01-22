// ...existing code...
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { registerUser, loginUser, logout, clearError } from './authSlice';

export default function AuthForms() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = auth.status === 'loading';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === 'login') {
      await dispatch(loginUser({ username, password })).unwrap().catch(() => {});
    } else {
      await dispatch(registerUser({ username, password })).unwrap().catch(() => {});
    }
    setPassword('');
  }

  function handleLogout() {
    dispatch(logout());
    setUsername('');
    setPassword('');
  }

  function switchMode(next: 'login' | 'register') {
    dispatch(clearError());
    setMode(next);
    setPassword('');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="sm:flex sm:items-center sm:justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {auth.user ? 'Account' : mode === 'login' ? 'Sign in to your account' : 'Create an account'}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {auth.user
                  ? 'Manage your session and profile.'
                  : mode === 'login'
                  ? 'Enter your username and password to continue.'
                  : 'Fill in details to create a new account.'}
              </p>
            </div>

            <div className="mt-4 sm:mt-0">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => switchMode('login')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-l-md focus:outline-none ${
                    mode === 'login'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                  disabled={isLoading}
                >
                  Login
                </button>
                <button
                  onClick={() => switchMode('register')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-r-md focus:outline-none ${
                    mode === 'register'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                  disabled={isLoading}
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {auth.user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {auth.user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="text-lg font-medium text-gray-800">{auth.user.username}</div>
                    <div className="text-sm text-gray-500">User ID: {auth.user.id}</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                  <button
                    onClick={handleLogout}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                  >
                    Logout
                  </button>
                </div>

                {auth.error ? (
                  <div className="mt-3 text-sm text-red-700 bg-red-50 p-3 rounded-md">{auth.error}</div>
                ) : null}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      disabled={isLoading}
                      className="block w-full px-3 py-2 border rounded-md shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="your.username"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="block w-full px-3 py-2 border rounded-md shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between space-x-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="h-4 w-4 mr-2 text-white animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 100 24v-4a8 8 0 01-8-8z"
                          />
                        </svg>
                        Please wait…
                      </>
                    ) : mode === 'login' ? (
                      'Login'
                    ) : (
                      'Register'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                    className="px-3 py-2 text-sm bg-white border rounded-md hover:bg-gray-50 focus:outline-none"
                    disabled={isLoading}
                  >
                    Switch to {mode === 'login' ? 'Register' : 'Login'}
                  </button>
                </div>

                {auth.error ? (
                  <div className="mt-2 text-sm text-red-700 bg-red-50 p-3 rounded-md">{auth.error}</div>
                ) : null}
              </form>
            )}
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-400 text-center">
          Built with React + Redux Toolkit • Responsive Tailwind UI
        </div>
      </div>
    </div>
  );
}
// ...existing code...
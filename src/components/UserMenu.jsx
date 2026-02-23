import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from '../components/auth/LoginButton';
import { Link } from 'react-router-dom';


export default function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

    // Définir si l'utilisateur est admin selon un claim ou app_metadata
const isAdmin = user?.['https://api.yourapp.com/roles']?.[0] === 'Admin';

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <LoginButton className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700" />
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
      >
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
          {user?.name?.[0] || user?.email?.[0] || 'U'}
        </div>
        <span className="text-sm font-medium">
          {user?.name || user?.email}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-900">
              {user?.name || 'Utilisateur'}
            </p>
            <p className="text-xs text-gray-500">{user?.email===user?.name ? null : user?.email}</p>
            <p className="text-xs text-red-600 mt-1">
              {isAdmin ? '👑 Administrateur' : '👤 Client'}
            </p>
          </div>

          <Link
            to={isAdmin ? '/admin' : '/dashboard'}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            📊 Mon espace
          </Link>

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
          >
            🚪 Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}

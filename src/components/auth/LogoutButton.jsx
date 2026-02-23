import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LogoutButton = ({ className = '' }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button
      onClick={handleLogout}
      className={`bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors ${className}`}
    >
      Déconnexion
    </button>
  );
};
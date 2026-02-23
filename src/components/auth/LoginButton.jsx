import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

export const LoginButton = ({ className = '' }) => {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  console.log('AUTH USER 👉', user);

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/', // ← redirige vers la Home page après login
      },
    });
  };

  if (isAuthenticated) {
    // Redirection automatique si déjà connecté
    return <Navigate to="/" replace />;
  }

  return (
    <button
      onClick={handleLogin}
      className={`bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors ${className}`}
    >
      Se connecter
    </button>
  );
};

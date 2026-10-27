import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = ({ className = 'btn-primary', children = 'Espace client' }) => {
  const { loginWithRedirect, isLoading } = useAuth0();
  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={() => loginWithRedirect({ appState: { returnTo: '/espace' } })}
      className={className}
    >
      {children}
    </button>
  );
};

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LogoutButton = ({ className = 'btn-outline' }) => {
  const { logout } = useAuth0();
  return (
    <button type="button" className={className}
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Déconnexion
    </button>
  );
};

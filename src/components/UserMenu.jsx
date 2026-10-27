import React, { useEffect, useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { LoginButton } from './auth/LoginButton';

export default function UserMenu() {
  const { isAuthenticated, logout } = useAuth0();
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, []);

  if (!isAuthenticated) return <LoginButton className="btn-primary">Espace client</LoginButton>;

  const isAdmin = user?.role === 'Admin';
  const label = user?.name || user?.email || 'Mon compte';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="btn-outline max-w-[14rem]"
      >
        <span className="truncate">{label}</span>
        <span aria-hidden="true">▾</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-60 overflow-hidden rounded-2xl border border-encre-200 bg-white py-1 shadow-lift">
          <p className="px-4 py-2 text-xs text-encre-600">{isAdmin ? 'Administratrice' : 'Client'}</p>
          <Link to={isAdmin ? '/admin' : '/dashboard'} className="block px-4 py-2 text-sm text-encre-800 hover:bg-ardoise-50" onClick={() => setIsOpen(false)}>
            {isAdmin ? 'Back-office' : 'Mon espace client'}
          </Link>
          <button
            type="button"
            className="block w-full px-4 py-2 text-left text-sm text-encre-800 hover:bg-ardoise-50"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}

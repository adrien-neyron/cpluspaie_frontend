import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthContext } from '../../context/AuthContext';
import AccessDenied from './AccessDenied';

/** Autorise l'accès selon le rôle appliqué CÔTÉ SERVEUR (/auth/me), jamais selon un claim modifiable côté navigateur. */
export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated } = useAuth0();
  const { user, error } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  if (error === 'forbidden') return <AccessDenied reason="invitation" />;
  if (error || !user) return <AccessDenied reason="unavailable" />;
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'Admin' ? '/admin' : '/dashboard'} replace />;
  }
  return children;
};

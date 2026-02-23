import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../../hooks/useApi.ts';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();
  const { apiCall } = useApi();
  const [userRole, setUserRole] = React.useState(null);

  // Charger le rôle de l'utilisateur depuis l'API si nécessaire
  React.useEffect(() => {
    if (isAuthenticated && !userRole) {
      const fetchRole = async () => {
        try {
          const data = await apiCall('/auth/me'); // endpoint qui retourne { role: 'admin' | 'client' }
          setUserRole(data.role);
        } catch (err) {
          console.error('Failed to fetch user role:', err);
        }
      };
      fetchRole();
    }
  }, [isAuthenticated, userRole, apiCall]);

  if (isLoading || (isAuthenticated && !userRole)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

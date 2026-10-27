import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useLocation } from "react-router-dom";

/** /login : redirige vers Auth0 (connexion uniquement, pas d'inscription libre). */
export default function LoginPage() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();
  const returnTo = location.state?.from?.pathname || "/espace";

  useEffect(() => {
    if (!isLoading && !isAuthenticated) loginWithRedirect({ appState: { returnTo } });
  }, [isLoading, isAuthenticated, loginWithRedirect, returnTo]);

  if (isAuthenticated) return <Navigate to={returnTo} replace />;
  return <p role="status" className="p-8 text-center">Redirection vers la connexion sécurisée…</p>;
}

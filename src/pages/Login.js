import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, Navigate, useLocation } from "react-router-dom";

/** /login : redirige vers Auth0 (connexion uniquement, pas d'inscription libre).
 *  Si Auth0 renvoie une erreur, on l'affiche au lieu de relancer la connexion (évite une boucle de redirection). */
export default function LoginPage() {
  const { isAuthenticated, isLoading, loginWithRedirect, error, logout } = useAuth0();
  const location = useLocation();
  const returnTo = location.state?.from?.pathname || "/espace";

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !error) loginWithRedirect({ appState: { returnTo } });
  }, [isLoading, isAuthenticated, error, loginWithRedirect, returnTo]);

  if (isAuthenticated) return <Navigate to={returnTo} replace />;

  if (error) {
    return (
      <main id="contenu" className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-16" role="alert">
        <h1 className="text-2xl font-extrabold text-encre-900">La connexion n'a pas abouti</h1>
        <p className="mt-4 text-encre-700">
          Le service d'authentification a renvoyé une erreur. Si elle persiste, contactez-nous en indiquant le message ci-dessous.
        </p>
        <pre className="mt-4 whitespace-pre-wrap break-words rounded-xl bg-encre-100 p-4 text-sm text-encre-800">
          {error.error ? `${error.error} : ` : ""}{error.message || String(error)}
        </pre>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn-primary"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            Réessayer
          </button>
          <Link to="/" className="btn-outline">Retour à l'accueil</Link>
        </div>
      </main>
    );
  }
  return <p role="status" className="p-8 text-center">Redirection vers la connexion sécurisée…</p>;
}

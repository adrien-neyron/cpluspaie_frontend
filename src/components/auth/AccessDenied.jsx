import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function AccessDenied({ reason }) {
  const { logout } = useAuth0();
  const invitation = reason === 'invitation';
  return (
    <main id="contenu" className="flex min-h-screen items-center justify-center bg-brume-100 px-4">
      <div className="card max-w-md p-8 text-center">
        <h1 className="text-2xl font-bold text-encre-800">
          {invitation ? 'Accès sur invitation' : 'Service momentanément indisponible'}
        </h1>
        <p className="mt-3 text-encre-600">
          {invitation
            ? "Votre compte n'est pas encore rattaché à une entreprise cliente. L'inscription est réservée aux clients invités : contactez votre consultante pour obtenir un accès."
            : 'Impossible de charger votre espace pour le moment. Réessayez dans quelques instants.'}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/contact" className="btn-primary">Nous contacter</Link>
          <button className="btn-outline" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Se déconnecter
          </button>
        </div>
      </div>
    </main>
  );
}

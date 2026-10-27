import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/LOGO_COULEUR.svg';
import { LogoutButton } from '../auth/LogoutButton';

export default function PortalShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-brume-100">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Aller au contenu
      </a>
      <header className="border-b border-brume-300 border-t-4 border-t-corail-500 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="C+Paie — retour au site">
              <img src={logo} alt="C+Paie" className="h-12 w-auto" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-encre-800">{title}</h1>
              {subtitle && <p className="text-sm text-encre-600">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn-outline hidden sm:inline-flex">Voir le site</Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main id="contenu" className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}

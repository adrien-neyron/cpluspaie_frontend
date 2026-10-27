import React from "react";
import { Link } from "react-router-dom";
import LogoBlanc from "../misc/LogoBlanc";
import { ReactComponent as LinkedinIcon } from "../../images/linkedin-icon.svg";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];
const legal = [
  { to: "/legalnotices", label: "Mentions légales" },
  { to: "/policy", label: "Politique de confidentialité" },
];
const link = "rounded text-ardoise-100 underline-offset-4 transition hover:text-white hover:underline";

export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ardoise-900 text-ardoise-100">
      <div aria-hidden="true" className="h-1.5 bg-gradient-to-r from-corail-500 via-corail-400 to-ardoise-400" />
      <div className="mx-auto grid max-w-screen-xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <LogoBlanc alt="C+Paie" className="h-12 w-auto" />
          <p className="mt-4 max-w-xs leading-relaxed">Consultante indépendante en paie : externalisation, remplacement et accompagnement sur mesure.</p>
          <a href="https://www.linkedin.com/in/carole-forestier/" target="_blank" rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20">
            <LinkedinIcon className="h-4 w-4" aria-hidden="true" />LinkedIn<span className="sr-only"> de Carole Forestier (nouvelle fenêtre)</span>
          </a>
        </div>
        <nav aria-label="Pied de page">
          <p className="text-xs font-extrabold uppercase tracking-widest text-corail-400">Navigation</p>
          <ul className="mt-4 space-y-2.5 font-semibold">
            {nav.map((l) => (<li key={l.to}><Link to={l.to} className={link}>{l.label}</Link></li>))}
          </ul>
        </nav>
        <nav aria-label="Informations légales">
          <p className="text-xs font-extrabold uppercase tracking-widest text-corail-400">Informations</p>
          <ul className="mt-4 space-y-2.5 font-semibold">
            {legal.map((l) => (<li key={l.to}><Link to={l.to} className={link}>{l.label}</Link></li>))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-screen-xl px-4 py-5 text-sm text-ardoise-200">
          © {new Date().getFullYear()} C+Paie — Site réalisé par Adrien Neyron
        </p>
      </div>
    </footer>
  );
}

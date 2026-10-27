import React from "react";
import { Link } from "react-router-dom";
import Header from "../headers/Header.js";
import { LoginButton } from "../auth/LoginButton";
import PortraitFrame from "../misc/PortraitFrame.js";
import portrait from "../../images/carole-portrait.jpg";
import CustomersLogoStripImage from "../../images/customers-logo-strip.png";

const points = ["Externalisation de la paie", "Remplacement sur mesure", "Accompagnement de projet"];

const Check = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="shrink-0">
    <circle cx="10" cy="10" r="10" fill="#FFE3E1" />
    <path d="M5.5 10.4l3 3 6-6.4" fill="none" stroke="#B13632" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home({ children }) {
  return (
    <>
      <Header />
      <main id="contenu">
        <div id="home" className="relative overflow-hidden bg-gradient-to-br from-ardoise-50 via-white to-corail-50 pb-20 pt-28 lg:pb-28 lg:pt-36">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-ardoise-200/50 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-corail-200/50 blur-3xl" />
          <div className="relative mx-auto grid max-w-screen-xl items-center gap-16 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="animate-fade-up text-center lg:text-left">
              <p className="eyebrow">Consultante indépendante en paie</p>
              <h1 className="mt-5 text-4xl font-black leading-[1.1] text-encre-800 sm:text-5xl xl:text-6xl">
                Votre partenaire en <span className="mark">gestion de paie</span>
              </h1>
              <p className="lead mx-auto mt-6 max-w-xl lg:mx-0">
                Une paie fiable, conforme et sans souci. J’adapte mon accompagnement à la taille et aux
                contraintes de votre entreprise pour que vous puissiez vous concentrer sur votre activité.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link to="/contact" className="btn-accent btn-lg w-full sm:w-auto">Demander un devis</Link>
                <LoginButton className="btn-outline btn-lg w-full sm:w-auto">Accéder à mon espace client</LoginButton>
              </div>
              <ul className="mt-8 flex flex-col items-center gap-x-6 gap-y-2 text-sm font-bold text-encre-700 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                {points.map((p) => (<li key={p} className="flex items-center gap-2"><Check />{p}</li>))}
              </ul>
              <div className="mt-10 border-t border-encre-200 pt-6">
                <p className="text-xs font-extrabold uppercase tracking-widest text-encre-600">Ils m’ont fait confiance</p>
                <img src={CustomersLogoStripImage} alt="Logos de clients de C+Paie : Linamar, Vertycal, Le Pack" className="mx-auto mt-4 w-full max-w-sm opacity-70 grayscale lg:mx-0" />
              </div>
            </div>

            <div className="animate-fade-up px-6 pb-8 [animation-delay:150ms] lg:px-0 lg:pb-0 lg:pl-10">
              <PortraitFrame src={portrait} alt="Carole Forestier, consultante en paie, travaillant sur son ordinateur" caption="Carole Forestier" role="Consultante paie indépendante" />
            </div>
          </div>
        </div>
        {children}
      </main>
    </>
  );
}

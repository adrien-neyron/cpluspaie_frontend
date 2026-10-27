import React from "react";
import { Link } from "react-router-dom";

/** Bandeau d'en-tête des pages internes (Services, À propos). */
export default function PageHero({ eyebrow, title, intro, cta, to = "/contact" }) {
  return (
    <div className="on-dark relative overflow-hidden bg-gradient-to-br from-ardoise-900 via-ardoise-800 to-ardoise-700 px-4 pb-16 pt-32 text-center text-white md:pb-20 md:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-corail-500/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-ardoise-400/30 blur-3xl" />
      <div className="relative mx-auto max-w-3xl animate-fade-up">
        {eyebrow && <p className="eyebrow eyebrow-dark">{eyebrow}</p>}
        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-relaxed text-ardoise-100">{intro}</p>
        {cta && <Link to={to} className="btn-accent btn-lg mt-8">{cta}</Link>}
      </div>
    </div>
  );
}

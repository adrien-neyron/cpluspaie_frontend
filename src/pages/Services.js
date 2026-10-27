import React from "react";
import Header from "../components/headers/Header.js";
import Footer from "../components/footers/MiniCenteredFooter.js";
import Missions from "../components/features/Missions.js";
import Steps from "../components/features/Steps.js";
import PageHero from "../components/misc/PageHero.js";
import Reveal from "../components/misc/Reveal.js";
import { useDocumentTitle } from "../components/portal/ui";

export default function ServicesPage() {
  useDocumentTitle("Services");
  return (
    <>
      <Header />
      <main id="contenu">
        <PageHero
          eyebrow="Services"
          title="Mes services"
          intro="De l’externalisation complète de la paie au remplacement ponctuel : une prestation sur mesure, adaptée à la taille et aux contraintes de votre entreprise."
          cta="Demander un devis"
        />
        <Reveal><Missions subheading="Ce que je fais" heading={<>Ce que je peux <span className="mark">faire pour vous</span></>} description="" /></Reveal>
        <div className="section-soft"><Reveal><Steps heading={<>Facile de <span className="mark">travailler ensemble</span></>} /></Reveal></div>
      </main>
      <Footer />
    </>
  );
}

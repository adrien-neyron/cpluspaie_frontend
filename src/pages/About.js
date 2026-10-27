import React from "react";
import Header from "../components/headers/Header.js";
import Footer from "../components/footers/MiniCenteredFooter.js";
import Expertise from "../components/features/Expertise.js";
import Value from "../components/features/Value.js";
import Testimonial from "../components/testimonials/Testimonials.js";
import PageHero from "../components/misc/PageHero.js";
import Reveal from "../components/misc/Reveal.js";
import { useDocumentTitle } from "../components/portal/ui";
import François from "../images/Francois bernhard.jpeg";
import Sybille from "../images/sybille du peloux.jpeg";

export default function AboutPage() {
  useDocumentTitle("À propos");
  return (
    <>
      <Header />
      <main id="contenu">
        <PageHero
          eyebrow="À propos"
          title="Une experte à vos côtés"
          intro="Une consultante indépendante, à vos côtés pour sécuriser et simplifier votre paie."
          cta="Me contacter"
        />
        <Reveal><Expertise subheading="Mon expertise" /></Reveal>
        <Value
          heading={<>Je respecte toujours <span className="mark">mes principes</span></>}
          subheading="Mes valeurs"
        />
        <Testimonial
          subheading="Témoignages"
          heading={<>Ma relation avec <span className="mark">les clients</span></>}
          testimonials={[
            { profileImageSrc: Sybille, heading: "LE PACK", quote: "Grâce à Carole, nous avons enfin trouvé la relation de proximité qui nous manquait avec notre précédent expert paie. Compétente, disponible et réactive, nous avons l'impression qu'elle fait partie intégrante de la société.", customerName: "Sybille du Peloux", customerTitle: "Co-gérante" },
            { profileImageSrc: François, heading: "VERTYCAL", quote: "Responsable paie à temps partagé, Carole est très appréciée de ses équipes par sa disponibilité et sa capacité à les faire progresser. Elle est force de proposition et de conseils.", customerName: "François Bernhard", customerTitle: "Expert comptable" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}

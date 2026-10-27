import React from "react";
import Reveal from "../components/misc/Reveal.js";
import Hero from "../components/hero/Home.js";
import FeatureMissions from "../components/features/Missions.js";
import MainFeature from "../components/features/Expertise.js";
import MainFeature2 from "../components/features/Value.js";
import FeatureWithSteps from "../components/features/Steps.js";
import Testimonial from "../components/testimonials/Testimonials.js";
import François from "../images/Francois bernhard.jpeg";
import Sybille from "../images/sybille du peloux.jpeg";
import Footer from "../components/footers/MiniCenteredFooter.js";
import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";

export default () => {


  return (
    <>
      <Hero>

      <Reveal id="missions">
        <FeatureMissions
          heading={<>Un accompagnement <span className="mark">sur mesure</span></>}
          description="Entrepreneure en gestion de paie, je vous propose des solutions personnalisées pour simplifier vos processus, assurer la conformité réglementaire et optimiser votre gestion sociale."
        />
      </Reveal>
      <Reveal id="about">
        <MainFeature />
      </Reveal>
      <Reveal id="steps">
        <FeatureWithSteps heading={<>Facile de <span className="mark">travailler ensemble</span></>} />
      </Reveal>
      <Reveal id="values">
        <MainFeature2
          heading={<>Je respecte toujours <span className="mark">mes principes</span></>}
          features={[
            {
              Icon: MoneyIcon,
              title: "Abordable",
              description: "Je m'engage à vous offrir le meilleur tarif possible.",
            },
            {
              Icon: BriefcaseIcon,
              title: "Professionnalisme",
              description:
                "Précision impeccable, conformité rigoureuse aux réglementations et service client exemplaire.",
            },
          ]}
        />
      </Reveal>
      <Reveal id="returns">
        <Testimonial
          subheading="Témoignages"
          heading={<>Ma relation avec <span className="mark">les clients</span></>}
          testimonials={[
            {
              profileImageSrc:
                Sybille,
              heading: "LE PACK",
              quote:
                "Grâce à Carole, nous avons enfin trouvé la relation de proximité qui nous manquait avec notre précédent expert paie. Compétente, disponible et réactive, nous avons l'impression qu'elle fait partie intégrante de la société.",
              customerName: "Sybille du Peloux",
              customerTitle: "Co-gérante",
            },
            {
              profileImageSrc:
                François,
              heading: "VERTYCAL",
              quote:
                "Responsable paie à temps partagé Carole est trés appréciée de ses équipes par sa disponibilité et sa capacité à les faire progresser. Elle est force de proposition et de conseils. Elle permet à Vertycal de réaliser des missions à forte valeur ajoutée (audits, mise en place du CSE...).",
              customerName: "François Bernhard",
              customerTitle: "Expert comptable",
            },
            {
              // Avatar à initiales (pas de photo de stock ni de requête vers un site tiers)
              profileImageSrc:
                "data:image/svg+xml;utf8," +
                encodeURIComponent(
                  '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="128" height="128" fill="#465F80"/><text x="50%" y="54%" font-family="Arial" font-size="48" font-weight="700" fill="#fff" text-anchor="middle" dominant-baseline="middle">MS</text></svg>'
                ),
              heading: "LINAMAR",
              quote:
                "Carole m'a accompagnée durant mon intégration. Elle est réactive, disponible et a été un réel soutien grâce à son recul et son expérience sur des points paie complexes.",
              customerName: "Morgane Saulnier",
              customerTitle: "Responsable paie",
            },
          ]}
        />
      </Reveal>
      </Hero>
      <Footer />
    </>
  );
};

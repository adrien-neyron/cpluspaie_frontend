import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/hero/Home.js";
import FeatureMissions from "../components/features/Missions.js";
import MainFeature from "../components/features/Expertise.js";
import MainFeature2 from "../components/features/Value.js";
import FeatureWithSteps from "../components/features/Steps.js";
import Testimonial from "../components/testimonials/Testimonials.js";
import François from "../images/Francois bernhard.jpeg";
import Sybille from "../images/sybille du peloux.jpeg";
import Footer from "../components/footers/MiniCenteredFooter.js";
import heroScreenshotImageSrc from "../images/carole.jpeg";
import macHeroScreenshotImageSrc from "../images/team-illustration.svg";
import prototypeIllustrationImageSrc from "../images/prototype-illustration.svg";
import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";

export default () => {


  return (
    <>
      <Hero id="home" roundedHeaderButton={true} />

      <motion.div
        id="missions"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}>
        <FeatureMissions
          heading={
            <>
              Mes Services.
            </>
          }
        />
      </motion.div>
      <motion.div
        id="about"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}>
        <MainFeature
          imageSrc={heroScreenshotImageSrc}
          imageBorder={true}
          imageDecoratorBlob={true}
        />
      </motion.div>
      <motion.div
        id="steps"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}>
        <FeatureWithSteps
          heading={
            <>
              Facile de Travailler Ensemble.
            </>
          }
          textOnLeft={false}
          imageSrc={macHeroScreenshotImageSrc}
          imageDecoratorBlob={true}
        />
      </motion.div>
      <motion.div
        id="values"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}>
        <MainFeature2
          id="values"
          heading={
            <>
              Je respecte toujours Mes Principes.
            </>
          }
          imageSrc={prototypeIllustrationImageSrc }
          showDecoratorBlob={false}
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
      </motion.div>
      <motion.div
        id="returns"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}>
        <Testimonial
          heading={
            <>
              Ma relation avec les clients.
            </>
          }
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
              profileImageSrc:
                "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1974&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
              heading: "LINAMAR",
              quote:
                "Carole m'a accompagnée durant mon intégration. Elle est réactive, disponible et a été un réel soutien grâce à son recul et son expérience sur des points paie complexes.",
              customerName: "Morgane Saulnier",
              customerTitle: "Responsable paie",
            },
          ]}
          id="returns"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}>
        <Footer />
      </motion.div>
    </>
  );
};

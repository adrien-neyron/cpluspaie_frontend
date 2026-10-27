import React from "react";
import ExpertiseIllustration from "../misc/ExpertiseIllustration.js";

export default ({
  id,
  subheading = "Mon expertise",
  heading = (
    <>
      Expertise en <span className="mark">gestion de la paie</span>
    </>
  ),
  description = `Je suis là pour vous aider à simplifier et à optimiser vos processus de paie. Avec une attention méticuleuse aux détails et une connaissance approfondie des réglementations, je m'engage à vous offrir un service fiable et professionnel.

Grâce à mon expérience des logiciels spécialisés et mon engagement envers l'excellence opérationnelle, je vous assure une gestion efficace et transparente de toutes vos opérations de paie.

Explorez mes services pour découvrir comment je peux vous aider à vous conformer aux normes en vigueur. Avec moi, vous pouvez compter sur un partenaire dévoué pour vous accompagner dans la gestion de la paie de votre entreprise.`,
  imageAlt = "Illustration : bulletin de paie, échéancier et conformité",
  textOnLeft = false,
}) => (
  <section id={id} className="section-soft relative overflow-hidden py-16 md:py-24">
    <div className="mx-auto grid max-w-screen-xl items-center gap-16 px-4 md:grid-cols-2 md:gap-12">
      <div className={`px-6 md:px-0 ${textOnLeft ? "md:order-last" : ""}`}>
        <ExpertiseIllustration label={imageAlt} />
      </div>
      <div className="text-center md:text-left">
        <p className="eyebrow">{subheading}</p>
        <h2 className="section-title mt-4">{heading}</h2>
        <div className="mt-6 space-y-4">
          {description.split(/\n\s*\n/).map((para, i) => (
            <p key={i} className="lead">{para.trim()}</p>
          ))}
        </div>
      </div>
    </div>
  </section>
);

import React from "react";
import TeamIllustrationSrc from "../../images/team-illustration.svg";
import { ReactComponent as SvgDotPattern } from "../../images/dot-pattern.svg";

export default ({
  id,
  subheading = "Our Expertise",
  heading = (
    <>
      Expertise en <span className="text-secondary-200">Gestion de la Paie.</span>
    </>
  ),
  description = `Je suis là pour vous aider à simplifier et à optimiser vos processus de paie. Avec une attention méticuleuse aux détails et une connaissance approfondie des réglementations, je m'engage à vous offrir un service fiable et professionnel.

  Grâce à mon expérience dans l'utilisation des logiciels spécialisés et mon engagement envers l'excellence opérationnelle, je peux vous assurer une gestion efficace et transparente de toutes vos opérations de paie. Mon objectif principal est de répondre à vos besoins spécifiques et de vous offrir un service client de qualité.
  
  Explorez mes services dès maintenant pour découvrir comment je peux vous aider à simplifier vos processus de paie et à vous conformer aux normes en vigueur. Avec moi, vous pouvez compter sur un partenaire dévoué pour vous accompagner dans la gestion de la paie de votre entreprise.`,
  imageSrc = TeamIllustrationSrc,
  imageRounded = true,
  imageBorder = false,
  imageShadow = false,
  imageDecoratorBlob = false,
  textOnLeft = true,
}) => {
  return (
    <div id={id} className="relative min-h-screen ">
      <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-4 md:mx-auto md:py-24 items-center">
        {/* Image Column */}
        <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-4/12 flex-shrink-0 relative">
          <img
            src={imageSrc}
            alt="Illustration"
            className={`w-full ${imageRounded ? "rounded" : ""} ${
              imageBorder ? "border" : ""
            } ${imageShadow ? "shadow" : ""}`}
          />
          {imageDecoratorBlob && (
            <SvgDotPattern className="w-20 h-20 absolute md:right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-red-500" />
          )}
        </div>

        {/* Text Column */}
        <div
          className={`w-full max-w-md mx-auto md:max-w-none md:mx-0 mt-16 md:mt-0 md:w-6/12 ${
            textOnLeft ? "md:mr-12 lg:mr-16 md:order-first" : "md:ml-12 lg:ml-16 md:order-last"
          }`}
        >
          <div className="lg:py-8 text-center md:text-left">
            <h5 className="text-center md:text-left text-primary-500 font-semibold">
              {subheading}
            </h5>
            <h2 className="mt-4 font-black text-3xl sm:text-4xl lg:text-5xl leading-tight text-center md:text-left">
              {heading}
            </h2>
            <p className="mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 text-center md:text-left">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

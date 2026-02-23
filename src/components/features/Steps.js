import React from "react";
import { ReactComponent as TeamIllustrationSrc } from "../../images/team-illustration.svg";

export default ({
  id,
  subheading = "Our Expertise",
  heading = "",
  imageSrc = TeamIllustrationSrc,
  textOnLeft = true,
  steps = null,
}) => {
  const defaultSteps = [
    {
      heading: "Contact",
      description: "Envoyer moi un email pour que je puisse prendre contact avec vous."
    },
    {
      heading: "Devis",
      description: "Construisons le devis ensemble avant d'établir le contrat."
    },
    {
      heading: "Collaboration",
      description: "Une fois le contrat signé, nous commençons notre collaboration."
    }
  ];

  if (!steps) steps = defaultSteps;

  return (
    <div id={id} className="relative min-h-screen">
      <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-4 md:mx-auto py-20 md:py-24 items-center">
        
        {/* Image Column */}
        <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-6/12 flex-shrink-0 flex justify-center items-center">
          <TeamIllustrationSrc style={{ height: "30rem", color: 'rgba(239, 68, 68, 1)' }} />
        </div>

        {/* Text Column */}
        <div className={`w-full max-w-md mx-auto md:max-w-none md:mx-0 mt-16 md:mt-0 md:w-6/12 ${
          textOnLeft ? "md:mr-12 lg:mr-16 md:order-first" : "md:ml-12 lg:ml-16 md:order-last"
        }`}>
          <div className="lg:py-8 text-center md:text-left">
            <h5 className="text-center md:text-left text-primary-500 font-semibold">{subheading}</h5>
            <h2 className="mt-4 font-black text-3xl sm:text-4xl lg:text-5xl leading-tight text-center md:text-left">{heading}</h2>
            
            {/* Steps */}
            <ul className="mt-12">
              {steps.map((step, index) => (
                <li key={index} className="mt-8 flex flex-col md:flex-row items-center md:items-start">
                  <div className="font-semibold text-4xl leading-none text-gray-400">{(index+1).toString().padStart(2,'0')}</div>
                  <div className="mt-3 md:mt-0 md:ml-6">
                    <h6 className="leading-none text-xl font-semibold">{step.heading}</h6>
                    <p className="mt-3 max-w-xs leading-loose text-sm text-gray-600 font-medium">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

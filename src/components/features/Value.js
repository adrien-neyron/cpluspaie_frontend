import React from "react";
import { ReactComponent as TeamIllustrationSrc } from "../../images/team-illustration.svg";
import { ReactComponent as SvgDotPattern } from "../../images/dot-pattern.svg";
import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";

export default ({
  id,
  subheading = "Our Expertise",
  heading = <>Designed & Developed by <span className="text-primary-500">Professionals.</span></>,
  description = "La confiance est cruciale pour établir des liens solides et une communication efficace. Cela simplifie la prise de décisions et renforce la cohésion dans les équipes. Des valeurs communes sont la clé d'une collaboration harmonieuse et réussie.",
  imageSrc = TeamIllustrationSrc,
  showDecoratorBlob = false,
  textOnLeft = true,
  features = null
}) => {

  const defaultFeatures = [
    {
      Icon: BriefcaseIcon,
      title: "Professionnalisme",
      description: "Précision impeccable, une conformité rigoureuse aux réglementations et un service client exemplaire.",
      bgColor: "bg-teal-300",
      textColor: "text-teal-800"
    },
    {
      Icon: MoneyIcon,
      title: "Abordable",
      description: "Je m'engage à vous offrir le meilleur tarif possible",
      bgColor: "bg-red-300",
      textColor: "text-red-800"
    }
  ];

  if (!features) features = defaultFeatures;

  return (
    <div id={id} className="relative min-h-screen">
      <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-4 md:mx-auto py-20 md:py-24 items-center">

        {/* Image Column */}
        <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-6/12 flex-shrink-0 relative">
          <img src={imageSrc} alt="Illustration" className="w-full h-auto rounded shadow" />
          {showDecoratorBlob && (
            <SvgDotPattern className="w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10" />
          )}
        </div>

        {/* Text Column */}
        <div className={`w-full max-w-md mx-auto md:max-w-none md:mx-0 mt-16 md:mt-0 md:w-6/12 ${textOnLeft ? "md:mr-12 lg:mr-16 md:order-first" : "md:ml-12 lg:ml-16 md:order-last"}`}>
          <div className="lg:py-8 text-center md:text-left">
            <h5 className="text-center md:text-left text-primary-500 font-semibold">{subheading}</h5>
            <h2 className="mt-4 font-black text-3xl sm:text-4xl lg:text-5xl leading-tight text-center md:text-left">{heading}</h2>
            <p className="mt-8 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100">{description}</p>

            <div className="mx-auto md:mx-0 flex flex-col lg:flex-row max-w-xs lg:max-w-none mt-10">
              {features.map((feature, index) => (
                <div key={index} className="mt-10 lg:mt-8 flex items-center md:items-start flex-col md:mr-8 last:mr-0">
                  <div className="flex items-center">
                    <div className={`mx-auto inline-block border border-primary-500 text-primary-500 text-center rounded p-2 flex-shrink-0 ${feature.bgColor} ${feature.textColor}`}>
                      <feature.Icon className="w-5 h-5" />
                    </div>
                    <div className="ml-3 font-bold text-xl">{feature.title}</div>
                  </div>
                  <div className="mt-4 text-center md:text-left text-gray-600 leading-relaxed">{feature.description}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

import React from "react";
import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";

export default ({
  id,
  subheading = "Mes valeurs",
  heading = <>Je respecte toujours <span className="mark">mes principes</span></>,
  description = "La confiance est cruciale pour établir des liens solides et une communication efficace. Elle simplifie la prise de décision et renforce la cohésion dans les équipes.",
  features = null,
}) => {
  const defaultFeatures = [
    { Icon: BriefcaseIcon, title: "Professionnalisme", description: "Précision impeccable, conformité rigoureuse aux réglementations et service client exemplaire." },
    { Icon: MoneyIcon, title: "Abordable", description: "Je m'engage à vous offrir le meilleur tarif possible." },
  ];
  if (!features) features = defaultFeatures;

  return (
    <section id={id} className="relative overflow-hidden bg-ardoise-900 py-16 text-white md:py-24 on-dark">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-corail-500/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-ardoise-500/30 blur-3xl" />
      <div className="relative mx-auto max-w-screen-xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow eyebrow-dark">{subheading}</p>
          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-[2.75rem]">
            {heading}
          </h2>
          <p className="mt-5 text-base font-medium leading-relaxed text-ardoise-100 lg:text-lg">{description}</p>
        </div>
        <ul className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {features.map((f, i) => (
            <li key={i} className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-corail-500 text-white">
                <f.Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-extrabold">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-ardoise-100">{f.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

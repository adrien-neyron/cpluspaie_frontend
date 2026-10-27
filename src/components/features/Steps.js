import React from "react";

export default ({
  id,
  subheading = "Comment ça se passe",
  heading = "",
  steps = null,
}) => {
  const defaultSteps = [
    { heading: "Contact", description: "Envoyez-moi un message pour que je puisse prendre contact avec vous et comprendre votre besoin." },
    { heading: "Devis", description: "Construisons le devis ensemble avant d'établir le contrat." },
    { heading: "Collaboration", description: "Une fois le contrat signé, nous commençons notre collaboration." },
  ];
  if (!steps) steps = defaultSteps;

  return (
    <section id={id} className="mx-auto max-w-screen-xl px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{subheading}</p>
        <h2 className="section-title mt-4">{heading}</h2>
      </div>

      <ol className="relative mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-6">
        <span aria-hidden="true" className="absolute left-[16.6%] right-[16.6%] top-7 hidden border-t-2 border-dashed border-ardoise-200 md:block" />
        {steps.map((step, i) => (
          <li key={i} className="relative flex flex-col items-center text-center">
            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-corail-600 text-xl font-black text-white shadow-lift ring-8 ring-white">
              {i + 1}
            </span>
            <h3 className="mt-5 text-xl font-extrabold text-encre-800">{step.heading}</h3>
            <p className="mt-2 max-w-xs leading-relaxed text-encre-600">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

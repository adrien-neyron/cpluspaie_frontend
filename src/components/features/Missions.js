import React from "react";

// Import des SVG comme composants React
import { ReactComponent as ShieldIcon } from "../../images/shield-icon.svg";
import { ReactComponent as SupportIcon } from "../../images/support-icon.svg";
import { ReactComponent as CustomizeIcon } from "../../images/customize-icon.svg";
import { ReactComponent as FastIcon } from "../../images/fast-icon.svg";
import { ReactComponent as ReliableIcon } from "../../images/reliable-icon.svg";
import { ReactComponent as SimpleIcon } from "../../images/simple-icon.svg";

export default function Features({
  id,
  subheading = "Mes services",
  heading = "Amazing Features",
  description = "Entrepreneur en gestion de paie, je vous propose des solutions personnalisées pour simplifier vos processus, assurer la conformité réglementaire et optimiser votre gestion sociale.",
  cards = null,
}) {
  const defaultCards = [
    {
      Icon: ShieldIcon,
      title: "Externalisation Paie & Social",
      description:
        "Services d'externalisation complets pour soulager les entreprises de la charge administrative liée à la paie et aux aspects sociaux.",
    },
    {
      Icon: SupportIcon,
      title: "Remplacement Sur Mesure",
      description:
        "Un service de remplacement sur mesure pour les entreprises ayant besoin d'une assistance temporaire ou ponctuelle dans leur service de paie.",
    },
    {
      Icon: CustomizeIcon,
      title: "Accompagnement De Projet",
      description:
        "Offrir un soutien expert et personnalisé tout au long du processus de gestion de paie, en guidant les clients à travers les différentes étapes et en garantissant une implémentation réussie des projets.",
    },
    {
      Icon: ReliableIcon,
      title: "Maîtrise des Outils et Technologies",
      description:
        "Utiliser une expertise approfondie des logiciels de gestion de paie et des technologies connexes pour optimiser les processus et assurer une gestion efficace et précise de la paie.",
    },
    {
      Icon: FastIcon,
      title: "Veille Réglementaire et Conformité",
      description:
        "Assurer une surveillance constante des évolutions légales et réglementaires dans le domaine de la paie, en garantissant que les pratiques restent toujours conformes aux exigences légales en vigueur.",
    },
    {
      Icon: SimpleIcon,
      title: "Service Client et Relationnel",
      description:
        "Fournir un service client en établissant des relations de confiance avec les clients, en comprenant leurs besoins spécifiques et en offrant des solutions adaptées.",
    },
  ];

  if (!cards) cards = defaultCards;

  const tones = [
    "bg-ardoise-100 text-ardoise-700 group-hover:bg-ardoise-500 group-hover:text-white",
    "bg-corail-100 text-corail-700 group-hover:bg-corail-600 group-hover:text-white",
  ];

  return (
    <section id={id} className="mx-auto max-w-screen-xl px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{subheading}</p>
        <h2 className="section-title mt-4">{heading}</h2>
        {description && <p className="lead mt-5">{description}</p>}
      </div>

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <li key={i} className="group card card-hover flex flex-col p-7">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition duration-300 ${tones[i % 2]}`}>
              <card.Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-xl font-extrabold leading-snug text-encre-800">{card.title}</h3>
            <p className="mt-3 leading-relaxed text-encre-600">{card.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

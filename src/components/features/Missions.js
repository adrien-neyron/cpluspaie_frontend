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

  return (
    <section id={id} className="min-h-screen px-4  md:py-12 max-w-screen-xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left mt-8">{heading}</h2>
      {description && <p className="text-gray-700 text-center md:text-left mt-6">{description}</p>}

      <div className="flex flex-wrap justify-center md:justify-start gap-8">
        {cards.map((card, i) => (
          <div key={i} className="w-full sm:w-1/2 lg:w-1/3 max-w-sm flex flex-col items-center text-center sm:text-left p-6 border rounded-lg">
            <div className="bg-gray-100 p-5 rounded-full flex items-center justify-center mb-4">
              <card.Icon className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-gray-800 leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

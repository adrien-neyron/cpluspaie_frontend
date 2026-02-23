import React from "react";
import Header from "../components/headers/Header.js";

const LegalNotices = ({ headingText = "Mentions Légales" }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900">{headingText}</h1>
        </div>

        <div className="text-gray-800 text-lg space-y-6">
          <h1 className="text-3xl font-bold mt-10">Mentions légales</h1>

          <h2 className="text-2xl font-bold mt-8">Éditeur du site</h2>
          <p className="mt-2 leading-relaxed">
            <strong>Raison sociale :</strong> C+PAIE
            <br />
            <strong>Forme juridique :</strong> SARL
            <br />
            <strong>Capital social :</strong> 1 000 €
            <br />
            <strong>Adresse du siège :</strong> 1435 Route de la barliette 74300 Araches la Frasse
            <br />
            <strong>Numéro SIRET :</strong> 123 456 789 00017
            <br />
            <strong>RCS :</strong> Paris B 123 456 789
            <br />
            <strong>TVA intracommunautaire :</strong> FR12 123456789
            <br />
            <strong>Directrice :</strong> Mme Carole Forestier
            <br />
            <strong>Contact :</strong> carol.forestier@gmail.com
          </p>

          <h2 className="text-2xl font-bold mt-8">Hébergement</h2>
          <p className="mt-2 leading-relaxed">
            <strong>Nom de l’hébergeur :</strong> Vercel Inc.
            <br />
            <strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
            <br />
            <strong>Site web :</strong> <a href="https://vercel.com" className="text-red-600 hover:underline">https://vercel.com</a>
          </p>

          <h2 className="text-2xl font-bold mt-8">Conditions d’utilisation</h2>
          <p className="mt-2 leading-relaxed">
            Le présent site est accessible à tout moment aux utilisateurs. Il est mis à jour régulièrement par [Nom de la société]. Le site a pour objet de fournir des informations sur les services de consulting en paie proposés par l’entreprise.
          </p>

          <h2 className="text-2xl font-bold mt-8">Propriété intellectuelle</h2>
          <p className="mt-2 leading-relaxed">
            Tous les éléments du site (textes, images, logo, etc.) sont la propriété exclusive de [Nom de la société], sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, sans autorisation est interdite.
          </p>

          <h2 className="text-2xl font-bold mt-8">Gestion des données personnelles</h2>
          <p className="mt-2 leading-relaxed">
            Ce site collecte des données via les formulaires de contact. Les informations recueillies sont réservées à un usage interne. Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données. Pour toute demande, contactez-nous à : <a href="mailto:carol.forestier@gmail.com" className="text-red-600 hover:underline">carol.forestier@gmail.com</a>.
          </p>

          <h2 className="text-2xl font-bold mt-8">Cookies</h2>
          <p className="mt-2 leading-relaxed">
            Le site peut utiliser des cookies à des fins statistiques ou pour améliorer l’expérience utilisateur. Vous pouvez configurer votre navigateur pour les refuser.
          </p>
        </div>
      </div>
    </>
  );
};

export default LegalNotices;

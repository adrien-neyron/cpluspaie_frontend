import React from "react";
import Header from "../components/headers/Header.js";
import Footer from "../components/footers/MiniCenteredFooter.js";

const PrivacyPolicyPage = ({ headingText = "Politique de confidentialité (RGPD)" }) => {
  return (
    <>
      <Header />
      <main id="contenu" className="container mx-auto px-4 pb-12 pt-28">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900">{headingText}</h1>
        </div>

        <div className="text-gray-800 text-lg space-y-6">
          <p>Dernière mise à jour : octobre 2026</p>

          <h2 className="text-3xl font-bold mt-10">Politique de confidentialité – Conformité RGPD</h2>
          <p>
            Cette page vous informe de nos politiques concernant la collecte, l'utilisation et la divulgation des données
            personnelles lorsque vous utilisez notre site internet, ainsi que des droits dont vous disposez en vertu du
            Règlement Général sur la Protection des Données (RGPD).
          </p>

          <h2 className="text-2xl font-bold mt-8">Identité du responsable du traitement</h2>
          <p className="mt-2 leading-relaxed">
            <strong>Nom :</strong> Carole Forestier – Consultante indépendante en paie
            <br />
            <strong>Email :</strong> carol.forestier@gmail.com
            <br />
            <strong>SIRET :</strong> [à compléter]
            <br />
            <strong>Adresse :</strong> 1435 Route de la barliette 74300 Araches la Frasse
          </p>

          <h2 className="text-2xl font-bold mt-8">Finalités du traitement</h2>
          <p className="mt-2 leading-relaxed">
            Les données personnelles collectées via le formulaire de contact ou lors de la navigation sur le site peuvent
            être utilisées pour :
          </p>
          <ul className="list-disc list-inside ml-5 space-y-2">
            <li>Répondre à vos demandes de renseignements ou devis</li>
            <li>Suivre la relation commerciale</li>
            <li>Améliorer la navigation et l’expérience utilisateur</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Types de données collectées</h2>
          <p className="mt-2 leading-relaxed">Les données suivantes peuvent être collectées :</p>
          <ul className="list-disc list-inside ml-5 space-y-2">
            <li>Nom, prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Code SIRET</li>
            <li>Convention d'entreprise</li>
            <li>Message</li>
            <li>Adresse IP (journaux techniques de l’hébergeur et limitation anti-abus du formulaire)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Espace client sécurisé</h2>
          <p className="mt-2 leading-relaxed">
            L’accès à l’espace client est réservé aux clients invités : aucune inscription libre n’est possible. Pour le
            fonctionnement du portail, les données suivantes sont traitées : adresse e-mail et nom de l’utilisateur,
            informations de l’entreprise cliente (raison sociale, SIRET, convention collective, effectif, interlocuteurs),
            calendrier de paie, documents déposés par la consultante, et demandes envoyées depuis le portail. Chaque
            entreprise n’a accès qu’à ses propres données. L’authentification est assurée par <strong>Auth0</strong> (Okta
            Inc.), sous-traitant technique.
          </p>

          <h2 className="text-2xl font-bold mt-8">Base légale du traitement</h2>
          <p className="mt-2 leading-relaxed">Les traitements reposent sur :</p>
          <ul className="list-disc list-inside ml-5 space-y-2">
            <li>Votre consentement (formulaire de contact)</li>
            <li>L’intérêt légitime de l’activité (suivi des échanges professionnels)</li>
            <li>Le respect d’obligations légales (comptabilité, archivage, etc.)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Durée de conservation</h2>
          <p className="mt-2 leading-relaxed">
            Les données sont conservées pendant la durée nécessaire à la finalité du traitement, sauf obligation légale :
          </p>
          <ul className="list-disc list-inside ml-5 space-y-2">
            <li>3 ans après le dernier contact pour les prospects</li>
            <li>10 ans pour les documents comptables</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Partage des données</h2>
          <p className="mt-2 leading-relaxed">
            Les données ne sont en aucun cas vendues à des tiers. Elles peuvent être transmises à des prestataires techniques
            pour l’hébergement ou le bon fonctionnement du site, dans le respect du RGPD.
          </p>

          <h2 className="text-2xl font-bold mt-8">Hébergement</h2>
          <p className="mt-2 leading-relaxed">
            Le site est hébergé par : <strong>VERCEL</strong> – Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA –{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ardoise-700 underline hover:no-underline"
            >
              Politique de confidentialité
            </a>
          </p>

          <h2 className="text-2xl font-bold mt-8">Vos droits</h2>
          <p className="mt-2 leading-relaxed">Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc list-inside ml-5 space-y-2">
            <li>Droit d’accès</li>
            <li>Droit de rectification</li>
            <li>Droit à l’effacement (« droit à l’oubli »)</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d’opposition</li>
          </ul>
          <p className="mt-2 leading-relaxed">
            Vous pouvez exercer vos droits en envoyant un email à : <strong>carol.forestier@gmail.com</strong>
          </p>

          <h2 className="text-2xl font-bold mt-8">Cookies et stockage local</h2>
          <p className="mt-2 leading-relaxed">
            Ce site n’utilise aucun cookie publicitaire ni outil de mesure d’audience. Seul l’espace client utilise le
            stockage du navigateur strictement nécessaire à la session de connexion (Auth0), qui ne requiert pas de
            consentement.
          </p>

          <h2 className="text-2xl font-bold mt-8">Sécurité</h2>
          <p className="mt-2 leading-relaxed">
            Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données
            personnelles contre l’accès non autorisé, la divulgation, la perte ou la destruction.
          </p>

          <h2 className="text-2xl font-bold mt-8">Modification de la politique</h2>
          <p className="mt-2 leading-relaxed">
            Nous nous réservons le droit de modifier la présente politique de confidentialité. En cas de modification majeure,
            un message d’information sera diffusé sur le site.
          </p>

          <h2 className="text-2xl font-bold mt-8">Contact</h2>
          <p className="mt-2 leading-relaxed">Pour toute question relative à la protection de vos données personnelles, vous pouvez nous contacter :</p>
          <ul className="list-disc list-inside ml-5 space-y-2">
            <li>Par email : carol.forestier@gmail.com</li>
            <li>Par courrier : 1435 Route de la barliette 74300 Araches la Frasse</li>
          </ul>
          <p className="mt-2 leading-relaxed">
            Vous pouvez également introduire une réclamation auprès de la CNIL :{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ardoise-700 underline hover:no-underline"
            >
              www.cnil.fr
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;

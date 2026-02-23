📝 Documentation Technique – C+Paie (Site Vitrine)

📦 Présentation
Ce dépôt contient le code source du site vitrine de C+Paie, développé avec React 18, Tailwind CSS, et Styled-components, dans un style moderne, animé et responsive.

📁 Structure de base
React App (CRA) : Projet initialisé avec Create React App.

Build Tool : react-scripts (WebPack intégré).

Déploiement : Vercel.

🔧 Scripts disponibles
Commandes à exécuter via yarn ou npm run :

Script	Description
start	Lance l’environnement de développement local (localhost:3000).
build	Compile le projet en production dans le dossier build/.
test	Lance la suite de tests avec Jest et Testing Library.
eject	Permet de personnaliser la configuration Webpack (action irréversible).
deploy	Build + déploiement Netlify en production (--dir=build).

🧩 Dépendances principales
Package	Description
React 18	Bibliothèque JavaScript pour construire l’interface utilisateur.
React DOM	Rendu des composants React dans le DOM.
React Router DOM v6	Routing côté client moderne.
Styled-components	CSS-in-JS pour styliser les composants React.
Tailwind CSS v3	Framework CSS utilitaire.
twin.macro	Permet d’utiliser Tailwind dans styled-components.
Framer Motion	Animation fluide pour React.
react-slick + slick-carousel	Slider/carrousel responsive.
react-modal	Boîte de dialogue modale accessible.
react-rnd	Composant pour déplacer/redimensionner des éléments.
react-anchor-link-smooth-scroll	Scroll fluide vers les sections.
feather-icons	Icônes SVG légères et élégantes.
@emailjs/browser	Envoi d’email depuis le front sans backend.
react-github-btn	Boutons GitHub intégrés (stars, follow, fork...).

🧪 Dépendances de test
Package	Description
@testing-library/react	Tests d’interaction React (DOM rendering).
@testing-library/jest-dom	Matchers spécifiques pour les assertions DOM.
@testing-library/user-event	Simulation d’interactions utilisateur.

🛠️ Dépendance de développement
Package	Utilisation
@babel/plugin-proposal-private-property-in-object	Support syntaxique avancé pour Babel

🔍 Linting & Compatibilité
ESLint
Basé sur la configuration de Create React App

Désactive la règle import/no-anonymous-default-export dans tous les fichiers src/**/*.js

Compatibilité navigateurs
Environnement	Cible navigateur
Production	> 0.2%, pas de navigateurs obsolètes, sauf Opera Mini
Dev	Dernière version de Chrome, Firefox et Safari

🚀 Déploiement
Le projet est conçu pour un déploiement rapide via Netlify :

bash
Copier
Modifier
yarn build && netlify deploy --prod --dir=build
Nécessite le CLI Netlify.

Le répertoire build contient les fichiers de production.

✅ Pré-requis techniques
Node.js ≥ 14

Yarn ou npm

Accès à une instance de Netlify pour déploiement (optionnel)

🔮 Recommandations
Ajouter un fichier .env pour sécuriser les clés (ex: EMAILJS_PUBLIC_KEY)

Utiliser un linter et prettier pour la cohérence du code

Mettre à jour les dépendances régulièrement (attention à React 18 / Router 6)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';
import { auth0Config } from './utils/auth0.config';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Après connexion, retour sur la page demandée (par défaut /espace qui oriente selon le rôle).
const onRedirectCallback = (appState) => {
  window.history.replaceState({}, document.title, appState?.returnTo || '/espace');
  window.dispatchEvent(new PopStateEvent('popstate'));
};

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={auth0Config.authorizationParams}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

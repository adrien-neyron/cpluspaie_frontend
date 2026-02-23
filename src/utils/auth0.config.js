export const auth0Config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin + '/callback',
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    scope: 'openid profile email offline_access read:contacts write:contacts admin:all',
  },
  cacheLocation: 'localstorage',
  useRefreshTokens: true,
};

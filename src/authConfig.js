// src/authConfig.js

export const msalConfig = {
  auth: {
    clientId: '1c0e40a8-4c6d-458e-9ed6-2167e7f2f47e',
    authority:
      'https://login.microsoftonline.com/434eb67d-52fc-447c-8ebf-7aaeda62969f',
    redirectUri: 'http://localhost:3000/auth/callback',
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};

export const loginRequest = {
  scopes: ['Calendars.ReadWrite'],
};

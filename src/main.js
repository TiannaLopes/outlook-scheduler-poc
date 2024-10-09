// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

const app = createApp(App);

// Provide the msalInstance immediately, without waiting for initialization
app.provide('msalInstance', msalInstance);

// Mount the Vue app
app.mount('#app');

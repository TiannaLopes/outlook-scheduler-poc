<!-- src/App.vue -->
<template>
  <div id="app">
    <h1>Appointment Scheduler</h1>
    <div v-if="!isAuthenticated">
      <p>Not authenticated yet. Please login.</p>
      <button @click="login">Login with Microsoft</button>
    </div>
    <div v-else>
      <p>Welcome, {{ userName }}</p>
      <button @click="logout">Logout</button>
      <AppointmentForm />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  setup() {
    const isAuthenticated = ref(false);
    const userName = ref('');
    const accessToken = ref('');

    const login = async () => {
      window.location.href = 'http://localhost:3000/auth/login'; // Start the OAuth flow
    };

    const getTokens = async (authCode) => {
      try {
        const response = await axios.get(`http://localhost:3000/auth/callback?code=${authCode}`);
        accessToken.value = response.data.accessToken;  // Store the access token
        console.log('Access Token:', accessToken.value);

        // Now that we have the access token, fetch the user's profile
        getUserProfile(accessToken.value);
        isAuthenticated.value = true;
      } catch (error) {
        console.error('Error fetching tokens', error);
      }
    };

    // Function to fetch user profile from Microsoft Graph
    const getUserProfile = async (accessToken) => {
      try {
        const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('User Profile:', response.data);
        userName.value = response.data.displayName; // Set the username
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    // Check if there's an authorization code in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      getTokens(code); // Exchange the authorization code for tokens
    }

    return {
      isAuthenticated,
      userName,
      login,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 10px;
}
</style>
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
      <AppointmentForm :isAuthenticated="isAuthenticated" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AppointmentForm from './components/AppointmentForm.vue';

export default {
  components: {
    AppointmentForm,
  },
  /**
   * Sets up the component's reactive state and methods.
   * @returns {Object} The component's reactive state and methods.
   */
  setup() {
    const isAuthenticated = ref(false);
    const userName = ref('');
    const accessToken = ref('');

    /**
     * Redirects the user to the authentication endpoint for login.
     * This function initiates the login flow by navigating to the backend login endpoint.
     */
    const login = () => {
      window.location.href =
        'https://outlook-scheduler-poc-be-e4c1fcd1a068.herokuapp.com/auth/login';
    };

    /**
     * Logs out the user by clearing authentication data.
     * This function resets the authentication state and removes the access token from localStorage.
     */
    const logout = () => {
      isAuthenticated.value = false;
      userName.value = '';
      accessToken.value = '';
      localStorage.removeItem('accessToken'); // Clear the token from localStorage
      alert('You have been logged out.');
    };

    /**
     * Checks if the user is authenticated by examining the URL parameters or localStorage.
     * If an access token is found in the URL, it is stored in localStorage.
     * If no token is found in the URL, localStorage is checked for a stored token.
     */
    const checkAuthentication = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('accessToken');
      const name = urlParams.get('userName');

      if (token) {
        accessToken.value = token;
        userName.value = name || 'User';
        isAuthenticated.value = true;
        localStorage.setItem('accessToken', token); // Store the access token in localStorage

        // Clear the query parameters from the URL
        window.history.replaceState({}, document.title, '/');
      } else {
        // Check if there's a token stored in localStorage
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
          accessToken.value = storedToken;
          isAuthenticated.value = true;
        }
      }
    };

    // Lifecycle hook to check authentication when the component is mounted
    onMounted(() => {
      checkAuthentication();
    });

    return {
      isAuthenticated,
      userName,
      login,
      logout,
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

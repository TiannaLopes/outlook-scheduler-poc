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
  setup() {
    const isAuthenticated = ref(false);
    const userName = ref('');
    const accessToken = ref('');

    const login = () => {
      window.location.href = 'http://localhost:3000/auth/login';
    };

    const logout = () => {
      isAuthenticated.value = false;
      userName.value = '';
      accessToken.value = '';
      localStorage.removeItem('accessToken'); // Clear the token from localStorage
      alert('You have been logged out.');
    };

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

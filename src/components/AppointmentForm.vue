<template>
  <div>
    <h2>Schedule an Appointment</h2>
    <form @submit.prevent="createAppointment">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div>
        <label for="startTime">Start Time:</label>
        <input type="datetime-local" id="startTime" v-model="startTime" required />
      </div>
      <div>
        <label for="endTime">End Time:</label>
        <input type="datetime-local" id="endTime" v-model="endTime" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
      <button type="submit">Create Appointment</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const msalInstance = inject('msalInstance');
    const title = ref('');
    const startTime = ref('');
    const endTime = ref('');
    const description = ref('');
    const message = ref('');

    // Get the user's local timezone using Intl API
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const createAppointment = async () => {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length === 0) {
        message.value = 'Please log in to create an appointment.';
        return;
      }

      try {
        const account = accounts[0];
        const response = await msalInstance.acquireTokenSilent({
          scopes: ['Calendars.ReadWrite'],
          account: account,
        });

        const accessToken = response.accessToken;

        // Event object with user's timezone
        const event = {
          subject: title.value,
          body: {
            contentType: 'HTML',
            content: description.value,
          },
          start: {
            dateTime: new Date(startTime.value).toISOString(),
            timeZone: userTimeZone, // Use local timezone
          },
          end: {
            dateTime: new Date(endTime.value).toISOString(),
            timeZone: userTimeZone, // Use local timezone
          },
        };

        // Make the request to Microsoft Graph API to create the event
        const graphResponse = await axios.post(
          'https://graph.microsoft.com/v1.0/me/events',
          event,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (graphResponse.status === 201) {
          message.value = 'Appointment created successfully!';
          // Reset form fields
          title.value = '';
          startTime.value = '';
          endTime.value = '';
          description.value = '';
        }
      } catch (error) {
        console.error(error);
        message.value = 'Failed to create appointment. Please try again.';
      }
    };

    return {
      title,
      startTime,
      endTime,
      description,
      createAppointment,
      message,
      userTimeZone, // Make the timezone accessible in the template if needed
    };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 400px;
  margin: 0 auto;
}
div {
  margin-bottom: 10px;
  width: 100%;
}
label {
  display: block;
  margin-bottom: 5px;
}
input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
  font-size: 16px;
}
p {
  color: green;
  margin-top: 10px;
}
</style>

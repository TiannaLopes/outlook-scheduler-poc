<!-- src/components/AppointmentForm.vue -->
<template>
  <div>
    <h2>Schedule an Appointment</h2>
    <form v-if="isAuthenticated" @submit.prevent="createAppointment">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div>
        <label for="startTime">Start Time:</label>
        <input
          type="datetime-local"
          id="startTime"
          v-model="startTime"
          required
        />
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
    <p v-if="!isAuthenticated">Please log in to create an appointment.</p>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const title = ref('');
    const startTime = ref('');
    const endTime = ref('');
    const description = ref('');
    const message = ref('');

    const createAppointment = async () => {
      if (!props.isAuthenticated) {
        message.value = 'Please log in to create an appointment.';
        return;
      }

      try {
        // Get the access token from localStorage
        const token = localStorage.getItem('accessToken');
        if (!token) {
          message.value = 'Access token is missing. Please log in again.';
          return;
        }

        // Send request to the backend to create the appointment
        const response = await axios.post(
          'http://localhost:3000/appointments',
          {
            accessToken: token, // Use the stored access token
            title: title.value,
            startTime: startTime.value,
            endTime: endTime.value,
            description: description.value,
          }
        );

        if (response.status === 201) {
          message.value = 'Appointment created successfully!';
          title.value = '';
          startTime.value = '';
          endTime.value = '';
          description.value = '';
        }
      } catch (error) {
        console.error('Error creating appointment:', error);
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

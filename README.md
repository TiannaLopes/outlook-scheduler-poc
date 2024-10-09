
# Outlook Scheduler POC

This project is a proof of concept for scheduling appointments in an Outlook calendar using a Vue.js frontend and a Node.js/Express backend. The app integrates with Microsoft Azure Active Directory (Azure AD) for authentication and uses the Microsoft Graph API to create calendar events.

## Project Setup

To get started, follow these steps:

### Install Dependencies
```bash
npm install
```

### Compiles and Hot-Reloads for Development
```bash
npm run serve
```

### Compiles and Minifies for Production
```bash
npm run build
```

### Lints and Fixes Files
```bash
npm run lint
```

### JSDoc Documentation
The project uses JSDoc for code documentation. To view the generated docs locally, open the `docs/index.html` file in your browser.

To regenerate the documentation:
```bash
npm run docs
```

The documentation is also hosted online at [Project Documentation](https://<your-username>.github.io/<your-repo-name>/).

### Customize Configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Features

### Azure Active Directory Integration
The app integrates with Microsoft Azure Active Directory for authentication:
- Users are redirected to the Microsoft login page to authenticate using their Microsoft account (supports both organizational and personal accounts).
- The app uses OAuth 2.0 with the PKCE (Proof Key for Code Exchange) flow for secure authentication.
- Access tokens are retrieved and stored in the browser for making authenticated requests to the Microsoft Graph API.

### Logging in to Microsoft
- Clicking the "Login with Microsoft" button redirects the user to the authentication endpoint (`/auth/login`).
- After successful login, the app stores the access token and user's name in the browser's local storage.
- The user's authenticated status is maintained across sessions as long as the token is valid.

### Creating Calendar Appointments
- Authenticated users can create appointments in their Outlook calendar.
- The user can fill out a form with the appointment details, including the title, start time, end time, and description.
- When the form is submitted, a request is sent to the backend, which uses the Microsoft Graph API to create the event in the user's calendar.

### Backend Connection
The backend is a Node.js/Express server that handles:
1. **Authentication Flow:** It manages the OAuth 2.0 authorization process, including generating a PKCE code verifier and exchanging authorization codes for access tokens.
2. **Creating Calendar Events:** It accepts requests from the frontend to create calendar events using the Microsoft Graph API.

The backend uses the following endpoints:
- `GET /auth/login`: Redirects users to the Microsoft login page.
- `GET /auth/callback`: Handles the redirect from Microsoft after login and exchanges the authorization code for an access token.
- `POST /appointments`: Creates a new calendar event using the Microsoft Graph API.

## Documentation

For more details on the project's structure and code documentation, please see the [Project Documentation](https://<your-username>.github.io/<your-repo-name>/).

## Next Steps and Future Improvements

### Possible Features to Add
1. **Improved Error Handling and User Feedback:**
   - Display more informative messages to the user when authentication fails or calendar event creation encounters an issue.

2. **Token Refresh Mechanism:**
   - Implement a token refresh flow to automatically renew the access token when it expires.

3. **Recurring Events Support:**
   - Add the ability to schedule recurring events (e.g., daily, weekly).

4. **Multiple Calendar Support:**
   - Allow users to choose which calendar to add the event to (e.g., work calendar, personal calendar).

5. **Notification System:**
   - Send email or in-app notifications when an appointment is approaching.

6. **Offline Support and Data Synchronization:**
   - Enable offline access and synchronize appointments when the user comes back online.

## Contributing

Feel free to open issues and submit pull requests to help improve this project. Follow the existing coding style and add JSDoc comments for any new functions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

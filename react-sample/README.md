# React + Typescript WebSDK Sample

This Sample Repository follows the recommended core flow for and Incode's onboarding, you can find a step by step on how this project was created in [React Integration](https://developer.incode.com/docs/npm-integration-react).

We used the default Vite 5 Typescript React Template with some key changes:
* Added https via the `vite-plugin-mkcert`.
* Serve the app in the local network interface instead of just localhost (added --host to the `npm run dev` script).
* Used .env file to configure the project.

## Install
To install execute the following command in the terminal:
```bash
npm install
```

## Setup
Copy the `sample.env` file into `.env` and fill the variables:

```env
VITE_INCODE_API_URL=https://demo-api.incodesmile.com
VITE_INCODE_CLIENT_ID=<your-client-id>
VITE_TOKEN_SERVER_URL=<the-url-of-the-backend-server-user-to-get-the-session-object>
VITE_LOCAL_SERVER_URL=https://your-ip:port/
```

* The API URL for you is probably going to be the demo one, remember to change it when moving to production.

* Your clientID comes from the dashboard

* You must create a Token Server and put that url here, luckily for you we actually made several of them in the most popular backends languages: [Quick Start Servers](https://developer.incode.com/docs/quick-start-servers), you can be up and running in less than 15 minutes.

* You will need to visit this page on your mobile phone, that what the local server url is for, to put in your local IP and the port where vite exposes your project when you run `npm run dev`.

## Run
To run the project execute the following command in the terminal:
```bash
npm run dev
```

# Steps:
This sample implements the following steps.
* RedirectToMobile: Provides a convenient way to move the users to complete onboarding in a mobile phone, it has a QR code and a SMS sending feature.
* Geolocation and Device Fingerprinting: Get valuable information about the user that later can be used to apply business rules and fraud prevention.
* FrontId: Captures the front of the ID 
* BackId: Captures the back of the ID 
* ProcessId: Process the information contained in the ID
* Selfie: Takes a picture of the user.
* ProcessFace: Matchs the face of the user with the face in the ID.
* FinishOnboarding: Marks the session as complete and triggers all the postprocessing.

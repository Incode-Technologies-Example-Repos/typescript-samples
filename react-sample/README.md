# React + Typescript WebSDK Sample

This Sample Repository follows the recommended core flow for and Incode's onboarding, you can find a step by step on how this project was created in [React Integration](https://developer.incode.com/docs/npm-integration-react).

We used the default Vite 5 Typescript React Template with some key changes:
* Added https via the `vite-plugin-mkcert`.
* Serve the app in the local network interface instead of just localhost (added --host to the `npm run dev` script).
* Used .env file to configure the project.
* A reverse proxy configuration to serve a backend server from your own localhost

# Backend Server
A backend server that will generate the url is needed for this sample,
luckily for you we already have sample server for PHP, NodeJS, Python,
PHP and Java and .NET, please reffer to our documentation on subject:
[Quick Start Sample Server](https://developer.incode.com/docs/quick-start-servers)

In order to simplfy development, this repo is configured to reverse
proxy a local backend server (`http://localhost:3000`) in the `/api`
url like `https://<your-ip>:5173/api`, if you want to point your
frontend development to a backend server deployed elsewhere, change
the VITE_TOKEN_SERVER_URL to the full url of such server.

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
VITE_TOKEN_SERVER_URL=/api
VITE_LOCAL_SERVER_URL=https://your-ip:port/
```

* The API URL for you is probably going to be the demo one, remember to change it when moving to production.

* Your clientID comes from the dashboard

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

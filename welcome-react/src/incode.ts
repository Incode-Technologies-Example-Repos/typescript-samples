//import { create } from "";
const apiURL = import.meta.env.VITE_INCODE_API_URL as string;
const clientId = import.meta.env.VITE_INCODE_CLIENT_ID as string;

// const incode = create({
//   clientId: clientId,
//   apiURL: apiURL,
//   theme: {},
// });


const incodeConfig = {
  apiURL,
  clientId
};

//Must include script without defer
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const incode:unknown = window.OnBoarding.create(incodeConfig);

export default incode;

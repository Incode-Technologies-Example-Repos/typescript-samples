import { create } from "@incodetech/welcome";
const apiURL = import.meta.env.VITE_INCODE_API_URL as string;
const clientId = import.meta.env.VITE_INCODE_CLIENT_ID as string;

type SessionType ={
  token: string,
  interviewId: string
};

const incode = create({
  clientId: clientId,
  apiURL: apiURL,
  theme: {},
});

export {incode, type SessionType};

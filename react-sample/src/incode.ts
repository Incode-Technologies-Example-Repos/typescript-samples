import { create } from "@incodetech/welcome";
const apiURL = import.meta.env.VITE_INCODE_API_URL as string;

type SessionType ={
  token: string,
  interviewId: string,
  uuid?: string
};

const incode = create({
  apiURL: apiURL,
  lang: 'en-US',
});

export {incode, type SessionType};

import {useEffect} from "react"
import incode from "../incode"

type SessionType ={
  token: string
};

function FinishOnboarding({
  session,
  onSuccess,
  onError
}:FinishOnboardingPropTypes) {
  useEffect(() => {
    void incode.getFinishStatus(
      null as unknown as string,
      { token: session.token}
    ).then(() => {
      onSuccess();
    }).catch((error) => {
      onError({type: error});
    });
  }, [session, onSuccess, onError]);
  
  return <p>Processing...</p>;
}

type FinishOnboardingPropTypes = {
  session: SessionType;
  onSuccess: () => void;
  onError: (e: {type: string}) => void;
}

export {FinishOnboarding}
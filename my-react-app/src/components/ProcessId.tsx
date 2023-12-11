import {useEffect} from "react"
import incode from "../incode"

type SessionType ={
  token: string
};

function ProcessId({
  session,
  onSuccess,
  onError
}:ProccessIdPropTypes) {
  useEffect(() => {
    void incode.processId(
      {token: session.token}
    ).then(() => {
      onSuccess();
    }).catch((error) => {
      onError({type: error});
    });
  }, [session, onSuccess, onError]);
  
  return <p>Processing...</p>;
}

type ProccessIdPropTypes = {
  session: SessionType;
  onSuccess: () => void;
  onError: (e: {type: string}) => void;
}

export {ProcessId}
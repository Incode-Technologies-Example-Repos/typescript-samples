import {useEffect} from "react"
import incode from "../incode"

type SessionType ={
  token: string
};

function ProcessId({ session, onSuccess}:ProccessIdPropTypes) {
    useEffect(() => {
      void incode.processId({ token: session.token}).then(() => {
        onSuccess();
      });
      
    }, [session, onSuccess]);
  
    return <p>Processing...</p>;
  }
  type ProccessIdPropTypes = {
    session: SessionType;
    onSuccess: () => void;
  }
  
  export {ProcessId}
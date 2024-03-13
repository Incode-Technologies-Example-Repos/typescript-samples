import {useEffect, useRef} from "react"
import {incode, type SessionType} from "../incode"

function UserConsent({ session, onSuccess}:UserConsentPropTypes) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  
  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    incode.renderUserConsent(containerRef.current, {
      onSuccess,
      session: session,
      
    });
    isMounted.current = true;
  }, [session, onSuccess]);
  
  return <div ref={containerRef}></div>;
}
type UserConsentPropTypes = {
  session: SessionType;
  onSuccess: () => void;
}
export {UserConsent};
import {useEffect, useRef} from "react"
import {incode, type SessionType} from "../incode"

const RedirectToMobile = function({
  session,
  onSkip,
}: RedirectToMobileTypes) {
  const containerRef= useRef<HTMLDivElement>(null)
  const isMounted = useRef(false)
  
  useEffect(() => {
    if (isMounted.current) {
      return
    }

    function captureAndContinue() {
      //Register the device info
      incode.sendFingerprint(session);
      //Register the geolocation
      incode.sendGeolocation(session);
      onSkip()
    }
       
    const localServerUrl = import.meta.env.VITE_LOCAL_SERVER_URL as string;
    if ( incode.isDesktop() ) {
      incode.renderRedirectToMobile(containerRef.current, {
        session: session,
        onSuccess: (): void => console.log('success'),
        skipDesktopRedirect: (): void => {captureAndContinue()},
        allowSkipRedirect: true,
        url:localServerUrl,
      });
    } else {
      captureAndContinue();
    }
    
    isMounted.current = true
  }, [session, onSkip])
  
  return <div ref={containerRef}></div>
}

type RedirectToMobileTypes = {
  session: SessionType;
  onSkip: () => void;
}

export {RedirectToMobile}
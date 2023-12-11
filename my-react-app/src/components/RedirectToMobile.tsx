import {useEffect, useRef } from "react"
import incode from "../incode"

type SessionType ={
  token: string
};

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

    const localServerUrl = import.meta.env.VITE_LOCAL_SERVER_URL as string;
    if ( incode.isDesktop() ) {
      console.log(localServerUrl);
      incode.renderRedirectToMobile(containerRef.current, {
        session: session,
        onSuccess: (): void => console.log('success'),
        skipDesktopRedirect: (): void => onSkip(),
        allowSkipRedirect: true,
        url:localServerUrl,
      });
    } else {
        onSkip()
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
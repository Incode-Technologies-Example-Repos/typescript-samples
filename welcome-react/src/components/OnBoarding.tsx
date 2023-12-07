import { useEffect, useRef } from "react";
import arrowUp from "./../assets/arrow-up.svg";
import arrowDown from "./../assets/arrow-down.svg";
import icons from "./../assets/icons.svg";
import threeDots from "./../assets/three-dots.svg";

import incode from '../incode';

type SessionType ={
  token: string;
};

const FrontId = function({
  session,
  onSuccess,
  onError
}: FrontIdPropTypes) {
  const containerRef= useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  
  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    const currentUrl = window.location.href;
    // if (incode.isDesktop()) {


    //   // console.log(currentUrl);
    //   // // incode.renderRedirectToMobile(containerIncode, {
    //   // //   session: incodeToken,
    //   // //   onSuccess: (): void => resolve(true),
    //   // //   skipDesktopRedirect: (): void => resolve(false),
    //   // //   allowSkipRedirect: true,
    //   // // });
    //   // //void new Promise( (resolve, reject) => {
    //   incode.renderRedirectToMobile(containerRef.current, {
    //     onSuccess: (e) => console.log(e),
    //     //skipDesktopRedirect: (): void => reject(true),
    //     session: session,
    //     //allowSkipRedirect: true,
    //     url: currentUrl,
    //   });
        
    //   // });
    //   // // }).then((then)=>{console.log({then})})
    //   // // onSuccess: () => {
    //   // //   setIsFinished(true);
    //   // // },

    // } else{
    incode.renderCamera("front", containerRef.current, {
      onSuccess,
      // @ts-ignore
      onError,
      token: session,
      numberOfTries: 3,
      showTutorial: false,
      showCustomCameraPermissionScreen: true,
      showDoublePermissionsRequest: true,
    });
    // }
  
    isMounted.current = true;
  }, [session, onSuccess, onError]);

  return <div ref={containerRef}></div>;
}
type FrontIdPropTypes = {
  session: SessionType;
  onSuccess: () => void;
  onError: (e: {type: string}) => void;
}

function BackId({ session, onSuccess, onError }: BackIdPropTypes) {
  const containerRef= useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    incode.renderCamera("back", containerRef.current, {
      onSuccess,
      onError,
      token: session,
      numberOfTries: 3,
      showTutorial: true,
      showCustomCameraPermissionScreen: true,
      showDoublePermissionsRequest: true,
    });

    isMounted.current = true;
  }, [onSuccess, onError, session]);

  return <div ref={containerRef}></div>;
}
type BackIdPropTypes = {
  session: SessionType;
  onSuccess: () => void;
  onError: () => void;
}

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

function Selfie({ session, onSuccess, onError }:SelfiePropTypes) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    incode.renderCamera("selfie", containerRef.current, {
      //@ts-ignore
      onSuccess,
      onError,
      token: session,
      numberOfTries: 3,
      showTutorial: true,
      showCustomCameraPermissionScreen: true,
      showDoublePermissionsRequest: true,
    });
    isMounted.current = true;
  }, [session, onSuccess, onError]);

  return <div ref={containerRef}></div>;
}
type SelfiePropTypes = {
  session: SessionType;
  onSuccess: (response: {liveness:boolean; existingUser:boolean;}) => void;
  onError: () => void;
}

function FaceMatch({ session, onSuccess, onError, liveness, userExists }: FaceMatchPropTypes) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  
  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    incode.renderFaceMatch(containerRef.current, {
      onSuccess,
      token: session,
      liveness,
      existingUser: userExists,
      isSecondId: false
    });
    isMounted.current = true;
  }, [onSuccess, onError, session, liveness, userExists]);

  return <div ref={containerRef}></div>;
}
type FaceMatchPropTypes = {
  session: SessionType;
  onSuccess: () => void;
  onError: () => void;
  liveness: boolean;
  userExists: boolean;
}

// This only works for Android, you need to handle iOS
const ResetPermissions = function ({
  onTryAgain
}: ResetPermissionsPropTypes) {
  return (
    <div className="reset-permissions">
      <h1>Follow the next steps:</h1>
      <ul>
        <li>
          <span className="number">1</span> <p>Tap the 3 dots</p>{" "}
          <img className="three-dots" alt="three dots" src={threeDots} />
          <img
            className="arrow-up"
            src={arrowUp}
            alt="arrow pointing to the three dots"
          />
        </li>
        <li>
          <span className="number">2</span> <p>Tap this icon</p>{" "}
          <img
            src={arrowDown}
            className="arrow-down"
            alt="arrow pointing to icon with i"
          />
          <div>
            <img src={icons} alt="bar icons" />
          </div>
        </li>
        <li>
          <span className="number">3</span>{" "}
          <p>
    Tap in <span className="blue">&quot;Site settings&quot;</span>
          </p>
        </li>
        <li>
          <span className="number">4</span>{" "}
          <span className="blue">Allow Permission</span>{" "}
          <p style={{ marginLeft: 10 }}>to Camera</p>
        </li>
      </ul>
      <div className="button-container">
        <button onClick={onTryAgain}>Try Again</button>
      </div>
    </div>
  );
}
type ResetPermissionsPropTypes = {
  onTryAgain: () => void;
}

 
const RetrySteps = function ({ session, onSuccess, onError, numberOfTries }:RetryStepsPropTypes) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  
  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    incode.renderRetrySteps(
      containerRef.current,
      { token: session, numberOfTries,showPassport:false, showTutorials:false},
      {
        //@ts-ignore
        onSuccess,
        //@ts-ignore
        onError,
      }
    );
    isMounted.current = true;
  }, [onSuccess, onError, session, numberOfTries]);
  
  return <div ref={containerRef}></div>;
}
type RetryStepsPropTypes = {
  session: SessionType;
  onSuccess: () => void;
  onError: () => void;
  numberOfTries: number;
}

export {FrontId, BackId, ProcessId, ResetPermissions, Selfie, FaceMatch, RetrySteps, type SessionType}